import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

@Component({
  selector: 'page-updatetask',
  templateUrl: 'updatetask.html',
})
export class UpdatetaskPage {

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

  taskindex;
  todolist: any[] = [];
  STORAGE_KEY = 'todo_item';

  imageurl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public setBackgroundProvider: SetbackgroundProvider) {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatetaskPage');
  }

  ionViewDidEnter() {
    this.setBackgroundProvider.getBackground().then((val)=>{
      this.imageurl = 'url('+val+')';
      console.log(val);
    }).catch(error=>{
      //handle error
    });
  }
  
  //edit task
  editTask() {
     return this.storage.get(this.STORAGE_KEY).then(result => {
        result.forEach(element => {
          if(result.indexOf(element)===this.taskindex) {            
            element.taskname = this.todo.taskname;
            element.description = this.todo.description;
            element.tasktype = this.todo.tasktype;
            element.startdate = this.todo.startdate;
            element.enddate = this.todo.enddate;
            element.createdate = this.todo.createdate;
            element.taskstatus = this.todo.taskstatus;
            element.important = this.todo.important;

            this.todolist.push(element);
          }
          else {
            this.todolist.push(element);
          }
        });

        this.storage.set(this.STORAGE_KEY, this.todolist);
        this.navCtrl.popToRoot()
    });

  }
}
