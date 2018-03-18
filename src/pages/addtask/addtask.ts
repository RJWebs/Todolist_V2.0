import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, Events } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

// import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {

  todo: any = {
    taskname: '',
    description: '',
    tasktype: '',
    startdate: '',
    enddate: '',
    createdate: new Date(),
    taskstatus: 'In Progress',
    important: false
  };

  today = new Date().toJSON();
  enddateMin = new Date().toJSON();
  endDate;
  disableEnddate: boolean = true;

  todolist: any [] = [];
  STORAGE_KEY = 'todo_item';

  imageurl: any;
  backgroundcolor: any;
  fontFamily = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public setBackgroundProvider: SetbackgroundProvider, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtaskPage');
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

  //add data into storage
  addTask() {
    console.log(this.todo);

    this.todolist = [];

    return this.storage.get(this.STORAGE_KEY).then(result => {
      if (result) {

        result.forEach(element => {
          this.todolist.push(element);
        });       
        console.log('before push: ' +this.todolist);

        this.todolist.push(this.todo);
        console.log('after push: ' +this.todolist);
        //this.todolist = [];
        this.storage.set(this.STORAGE_KEY, this.todolist);
        console.log(this.todolist);

      } else {
        this.todolist.push(this.todo);
        this.storage.set(this.STORAGE_KEY, this.todolist);
      }

      // this.navCtrl.push(this.tabsPage);
      this.events.publish('task:add', this.todo.tasktype);
      this.navCtrl.popToRoot();
    });
  }

}
