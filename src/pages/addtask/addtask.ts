import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

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
    createdate: '',
    taskstatus: 'In Progress'
  };

  todolist: any [] = [];
  STORAGE_KEY = 'todo_item';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtaskPage');
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
