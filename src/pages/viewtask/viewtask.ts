import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-viewtask',
  templateUrl: 'viewtask.html',
})
export class ViewtaskPage {

  // taskname: string = this.navParams.get('taskname');
  // description: string = this.navParams.get('description');
  // tasktype: string = this.navParams.get('tasktype');
  // startdate: string = this.navParams.get('startdate'); 
  // enddate: string = this.navParams.get('enddate');
  // createdate: string = this.navParams.get('createdate'); 
  // taskstatus: string = this.navParams.get('taskstatus');
  // important: boolean = this.navParams.get('important');

  taskname: string;
  description: string;
  tasktype: string;
  startdate: string;
  enddate: string;
  createdate: string;
  taskstatus: string;
  important: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.taskname = navParams.get('taskname');
    this.description = navParams.get('description');
    this.tasktype = navParams.get('tasktype');
    this.startdate = navParams.get('startdate'); 
    this.enddate = navParams.get('enddate');
    this.createdate = navParams.get('createdate'); 
    this.taskstatus = navParams.get('taskstatus');
    this.important = navParams.get('important');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewtaskPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
