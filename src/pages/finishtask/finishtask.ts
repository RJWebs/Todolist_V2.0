import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-finishtask',
  templateUrl: 'finishtask.html',
})
export class FinishtaskPage {

  todolist: any[] = [];
  finishedtaskList: any[] = [];
  taskindex;
  finishedtask;
  FINISHED_KEY = 'completed_item';
  STORAGE_KEY = 'todo_item';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.taskindex = navParams.data; 
    this.finishTask();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishtaskPage');
  }

  //Remove finished items from storage and put into another storage
  finishTask() {
    console.log("in");
     this.storage.get(this.STORAGE_KEY).then(result => {
        result.forEach(element => {
          if(result.indexOf(element)===this.taskindex) {            
            this.finishedtask = element;
            console.log("finishtask "+ this.finishedtask.taskname+" "+ this.finishedtask.description);
          }
          else {
            this.todolist.push(element);
          }
        });
        console.log("todolist :"+ this.todolist);
        // this.storage.set(this.STORAGE_KEY, this.todolist);
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
      // this.storage.set(this.FINISHED_KEY, this.finishedtaskList);
    });

    this.navCtrl.popToRoot();
  }

}
