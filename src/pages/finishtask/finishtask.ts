import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-finishtask',
  templateUrl: 'finishtask.html',
})
export class FinishtaskPage {

  finishedtaskList: any[] = [];
  FINISHED_KEY = 'completed_item';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public alertCtrl: AlertController) {}

  ionViewDidEnter() {
    console.log('ionViewDidLoad FinishtaskPage');

    //get data from storage and display
    this.getFinishedTasks();
  } 

  getFinishedTasks() {
    // this.finishedtaskList = [];
    // this.storage.set(this.FINISHED_KEY, this.finishedtaskList);
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
          }
        }
      ]
    });
    confirm.present()
  }

}
