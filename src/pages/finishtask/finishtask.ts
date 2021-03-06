import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController, App, Events } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

@Component({
  selector: 'page-finishtask',
  templateUrl: 'finishtask.html',
})
export class FinishtaskPage {

  finishedtaskList: any[] = [];
  selectedTask;
  FINISHED_KEY = 'completed_item';

  todoList: any[] = [];
  STORAGE_KEY = 'todo_item';

  imageurl: any;
  backgroundcolor: any;
  fontFamily = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public alertCtrl: AlertController, public setBackgroundProvider: SetbackgroundProvider, public app: App,
              public events: Events) {}

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


    this.getFinishedTasks();
  } 

  //get data from storage and display
  getFinishedTasks() {
    this.storage.get(this.FINISHED_KEY).then(result => {
      if(result) {
        result.forEach(element => {
          this.finishedtaskList.push(element);
        })
      }
    })
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
            this.finishedtaskList.splice(i, 1);
            this.storage.set(this.FINISHED_KEY, this.finishedtaskList);
            this.events.publish('complete:delete', 1);
          }
        }
      ]
    });
    confirm.present()
  }

  //re-add task to storage 
  reAddTask(i, tasktype) {
    let confirm = this.alertCtrl.create({
      title: 'Do you want to re add this task?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Add',
          handler: () => {
            console.log('Agree clicked');
            
            let newList = [];

            this.finishedtaskList.forEach(element => {
              if(this.finishedtaskList.indexOf(element) != i) {
                newList.push(element);
              }
              else {
                this.selectedTask = element;
              }
            });

            this.finishedtaskList = newList;
            console.log(this.finishedtaskList);
            this.storage.set(this.FINISHED_KEY, this.finishedtaskList);

            this.storage.get(this.STORAGE_KEY).then(result => {
              if(result) {
                result.forEach(element => {
                  this.todoList.push(element);
                });
                this.todoList.push(this.selectedTask);
              } 
              else {
                this.todoList.push(this.selectedTask);
              }

              this.storage.set(this.STORAGE_KEY, this.todoList);

            });
            this.events.publish('complete:readd', tasktype);
            this.events.publish('listType:change');
            // this.navCtrl.setRoot(this.tabsPage);
 
            // this.navCtrl.popToRoot();
            this.app.getRootNav().push(TabsPage);
          }
        }
      ]
    });
    confirm.present()
  }

}
