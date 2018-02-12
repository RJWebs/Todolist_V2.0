import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController} from 'ionic-angular';
import { AddtaskPage } from "../addtask/addtask";
import { TaskserviceProvider } from "../../providers/taskservice/taskservice";

// import { Component, OnInit} from '@angular/core';
// import { NavController } from 'ionic-angular';

// import { MenuController, AlertController } from 'ionic-angular';
// import { TaskserviceProvider } from "../../providers/taskservice/taskservice";
// import { AddtaskPage } from "../addtask/addtask";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  listType: string = "All List";
  todoList: any [] = [];
  addtaskPage = AddtaskPage; 
  STORAGE_KEY = 'todo_item'; 

  showId = null;
  color = "dark"
  selectedTask = null;

  constructor(public navCtrl: NavController, public taskservice: TaskserviceProvider, public storage: Storage) {}

  ionViewDidEnter() {
    console.log('ionViewDidLoad HomePage');

    //get data from storage and display
    this.storage.get(this.STORAGE_KEY).then(result => {
      this.todoList = [];

      if(result) {
        result.forEach(element => {
          this.todoList.push(element);
        })
      }
    })
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
  changeImportant(color) {
    if(color === "dark") {
      this.color = 'danger';
    }
    else {
      this.color = 'dark';
    }
  }

}
