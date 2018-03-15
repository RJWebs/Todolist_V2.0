import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  imageurl: any;

  constructor(public navCtrl: NavController, public setBackgroundProvider: SetbackgroundProvider) {}

  ionViewDidEnter() {
    this.setBackgroundProvider.getBackground().then((val)=>{
      this.imageurl = 'url('+val+')';
      console.log(val);
    }).catch(error=>{
      //handle error
    });
  }

}
