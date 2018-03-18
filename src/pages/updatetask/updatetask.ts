import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

@Component({
  selector: 'page-updatetask',
  templateUrl: 'updatetask.html',
})
export class UpdatetaskPage implements OnInit {

  todo: any = {
    taskname: '',
    description: '',
    tasktype: '',
    startdate: '',
    enddate: '',
    createdate: '',
    taskstatus: '',
    important: ''
  };

  previouseTaskType;

  today = new Date().toJSON();
  enddateMin = new Date().toJSON();
  endDate;
  startDate = "";
  disableEnddate: boolean = true;

  taskindex;
  todolist: any[] = [];
  STORAGE_KEY = 'todo_item';

  imageurl: any;
  backgroundcolor: any;
  fontFamily = '';
  listType;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public setBackgroundProvider: SetbackgroundProvider, public events: Events) {
    // this.todo.description = navParams.get('description');
    this.todo.taskname = navParams.data.task.taskname; 
    this.todo.description = navParams.data.task.description;
    this.todo.tasktype = navParams.data.task.tasktype;
    this.todo.startdate = navParams.data.task.startdate;
    this.todo.enddate = navParams.data.task.enddate;
    this.todo.createdate = navParams.data.task.createdate;
    this.todo.taskstatus = navParams.data.task.taskstatus;
    this.todo.important = navParams.data.task.important;
    this.taskindex = navParams.data.taskindex;

    this.listType = navParams.data.listType;
  }

  ngOnInit() {
    //check startdate value to make enddate active
    if(this.todo.startdate === "" || this.todo.startdate === null) {
      console.log(this.todo.startdate);
      this.disableEnddate = true;
    }
    else {
      this.disableEnddate = false;
    }

    //get the tasktype before update the task
    this.previouseTaskType = this.todo.tasktype;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatetaskPage');
  }

  ionViewDidEnter() {
    //get background image url from storage
    this.setBackgroundProvider.getBackground().then((val)=>{
      this.imageurl = val;
      console.log(this.imageurl);
    });

    //get background color from storage
    this.setBackgroundProvider.getBackgroundColor().then((val)=>{
      this.backgroundcolor = val;
    });

    //get fontface from storage
    this.setBackgroundProvider.getFontType().then((val)=>{
      this.fontFamily = val;
    });

  }

  //set minimum value of enddate
  setMinDate(startdate) {
    this.enddateMin = startdate;
    this.startDate = startdate;
    console.log(this.enddateMin);

    this.disableEnddate = false;
  }

  //set enddate value
  setendDate(enddate) {
    this.endDate = enddate;
    console.log(this.endDate);
  }

  //remove enddate when clicking startdate
  resetValue() {
    if(this.endDate != "" || this.endDate != null) {
      this.todo.enddate = '';
    }
  }
  
  //edit task
  editTask() {
    let newary = [];
    let trueindex;
    let updatedTask;

     this.storage.get(this.STORAGE_KEY).then(result => {       

        //set tasks of the selected list into new array
        result.forEach(element => {
          if(this.listType === "All Lists") {
            newary.push({'element': element, 'index': result.indexOf(element)});
            console.log(newary);
          }
          else {
            if(element.tasktype === this.listType) {
              newary.push({'element': element, 'index': result.indexOf(element)});
              console.log(newary);
            }
          }
        });
        
        //set updated task detail and index into two varialbles
        newary.forEach(element => {
          if(newary.indexOf(element) === this.taskindex) {
            trueindex = element.index;
            updatedTask = this.todo;
          }
        });

        //set updated task into the actual index in storage task list
        return this.storage.get(this.STORAGE_KEY).then(result => {   
          result.forEach(element => {
              if(result.indexOf(element) === trueindex) {
                this.todolist.push(updatedTask);
              }
              else {
                this.todolist.push(element);
              }
          });

          this.storage.set(this.STORAGE_KEY, this.todolist);

          if(this.todo.tasktype != this.previouseTaskType) {
            this.events.publish('task:update', this.previouseTaskType, this.todo.tasktype);
          }

          this.navCtrl.popToRoot();
        });

     });
  }

}
