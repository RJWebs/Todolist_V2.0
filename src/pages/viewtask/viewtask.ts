import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

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

  imageurl: any;
  backgroundcolor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public setBackgroundProvider: SetbackgroundProvider) {
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
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
