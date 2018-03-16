import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  contentEle: any;
  imageEle: any;
  default: boolean;
  fontFamily = '';

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'blue': {
      'bg': 'rgb(214, 234, 248)',
      'fg': 'rgb(255, 255, 255)'
    },
    'gray': {
      'bg': 'rgb(213, 219, 219)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public setBackgroundProvider: SetbackgroundProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidEnter() {
    this.setBackgroundProvider.getBackground().then((val)=>{
      if(val==='Default') {
        this.default = true;
      }
      else {
        this.default = false;
      }
    });

    this.setBackgroundProvider.getFontType().then((val)=>{
      this.fontFamily = val;
    })
  } 

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.imageEle = this.navParams.data.imageEle;
    }
  }

  changeBackground(imageurl) {
    console.log(imageurl);
    if(imageurl==="Default") {
      this.imageEle.src = '';
    } 
    else {
      this.default = false;
      this.imageEle.src = imageurl;
    }
    this.setBackgroundProvider.setBackground(imageurl);
  }

  changeBackgroundColor(color) {
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    let bcolor = this.colors[color].bg;
    this.setBackgroundProvider.setBackgroundColor(bcolor);
  }

  changeFontFamily(fonttype) {
    this.contentEle.style.fontFamily = fonttype;
    this.setBackgroundProvider.setFontType(fonttype);
  }

}
