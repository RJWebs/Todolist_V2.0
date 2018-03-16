import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

// import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {

  // tabsPage = TabsPage;

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

  todolist: any [] = [];
  STORAGE_KEY = 'todo_item';

  imageurl: any;
  backgroundcolor: any;
  fontFamily = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public setBackgroundProvider: SetbackgroundProvider) {
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
        // this.todolist = [];
        this.storage.set(this.STORAGE_KEY, this.todolist);
        console.log(this.todolist);

      } else {
        this.todolist.push(this.todo);
        this.storage.set(this.STORAGE_KEY, this.todolist);
      }

      // this.navCtrl.push(this.tabsPage);
      this.navCtrl.popToRoot()
    });
  }

}
