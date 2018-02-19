import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { AddtaskPage } from "../addtask/addtask";
import { TaskserviceProvider } from "../../providers/taskservice/taskservice";
import { ViewtaskPage } from "../viewtask/viewtask";
import { UpdatetaskPage } from "../updatetask/updatetask";
import { FinishtaskPage } from "../finishtask/finishtask";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public toggled: boolean = false;
  myInput : string = "";

  listType: string = "All List";
  todoList: any [] = [];
  addtaskPage = AddtaskPage; 
  viewtaskPage = ViewtaskPage;
  updatetaskPage = UpdatetaskPage;
  finishtaskPage = FinishtaskPage;
  STORAGE_KEY = 'todo_item'; 

  finishedtask;
  finishedtaskList: any[] = [];
  FINISHED_KEY = 'completed_item';

  showId = null;
  color = "dark"
  selectedTask = null;

  constructor(public navCtrl: NavController, public taskservice: TaskserviceProvider, public storage: Storage,
              public alertCtrl: AlertController, public modalCtrl: ModalController) {
                this.toggled = false;
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad HomePage');

    //get data from storage and display
    this.getDataFromStorage();
  } 

  ngOnInit()
  {
    //set selected list tpe to header
    this.listType = this.taskservice.getTaskType();
  }

  //select task and get id
  selectTask(id) {
    console.log(id);
    this.selectedTask = id;
  }

  //show-hide task detail
  changeShow(id) {
    if(this.showId != id) {
      this.showId = id;
    }
    else {
      this.showId = null;
    }
  }

  //change important color on click
  changeImportant(i) {
    if(this.todoList[i].important) {
      this.todoList[i].important = false;
    } 
    else {
      this.todoList[i].important = true;
    }
    //this.storage.set(this.STORAGE_KEY, this.todoList);
  }

  //view task details
  openModal(i) {
    let task = this.todoList[i];

    let myModal = this.modalCtrl.create(this.viewtaskPage, task);
    myModal.present();
  }

  public toggle(): void {
       this.toggled = this.toggled ? false : true;
       if(this.toggled == false)
       {
         this.myInput = "";
          this.getDataFromStorage();
       }
    }

  //get data from storage on keypress
  onInput()
  {
    console.log(this.myInput);
    this.getDataFromStorage();
  }

  //function to get data from storage
  getDataFromStorage()
  {
    if(this.myInput == "" || this.myInput == null)
    {
      this.storage.get(this.STORAGE_KEY).then(result => {
      this.todoList = [];

      if(result) {
        result.forEach(element => {
          this.todoList.push(element);
        })
      }
    })
    }
    else
    {
       this.storage.get(this.STORAGE_KEY).then(result => {
      this.todoList = [];

      if(result) {
        result.forEach(element => {
          if(element.taskname.toLowerCase().includes(this.myInput.toLowerCase()))
          {
          this.todoList.push(element);
          }
        })
      }
    })
    }   
  }

  //delete tasks
  deleteTask(i) {
    let confirm = this.alertCtrl.create({
      title: 'Do you want to delete this task?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Agree clicked');
            this.todoList.splice(i, 1);
            this.storage.set(this.STORAGE_KEY, this.todoList);
            this.selectedTask = null;
            this.showId = null;
            //this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present()
  }

  //navigate into updatetask page
  updateTask(i) {
    this.navCtrl.push(this.updatetaskPage, {'task':this.todoList[i], taskindex:i});
  }

  //remove finished items from storage and put into another storage 
  completeTask(i) {
    this.storage.get(this.STORAGE_KEY).then(result => {
        this.todoList = [];
        
        result.forEach(element => {
          if(result.indexOf(element)===i) {            
            this.finishedtask = element;
            console.log("finishtask "+ this.finishedtask.taskname+" "+ this.finishedtask.description);
          }
          else {
            this.todoList.push(element);
          }
        });
        console.log("todolist :"+ this.todoList);
        this.storage.set(this.STORAGE_KEY, this.todoList);
    });

    this.storage.get(this.FINISHED_KEY).then(result => {
      if(result) {
        result.forEach(element => {
          this.finishedtaskList.push(element);
        });
        this.finishedtaskList.push(this.finishedtask);
      } 
      else {
        this.finishedtaskList.push(this.finishedtask);
      }
      console.log("finishtask :"+ this.finishedtask);
      this.storage.set(this.FINISHED_KEY, this.finishedtaskList);
    });
  } 

}
