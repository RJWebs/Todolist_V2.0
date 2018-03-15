import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  imageurl: any;

  constructor(public navCtrl: NavController, public setBackgroundProvider: SetbackgroundProvider) {
    console.log("about");       
  }

  ionViewDidEnter() {
    this.setBackgroundProvider.getBackground().then((val)=>{
      this.imageurl = 'url('+val+')';
      console.log(val);
    }).catch(error=>{
      //handle error
    });
  }

  chapterLists = ["chap1", "chap2", "chap3"];

}
