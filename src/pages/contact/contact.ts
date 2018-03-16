import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  imageurl: any;
  backgroundcolor: any;
  fontFamily = '';

  constructor(public navCtrl: NavController, public setBackgroundProvider: SetbackgroundProvider) {}

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

}
