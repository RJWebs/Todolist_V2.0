import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      // this.contentEle = SettingPage;
      // this.textEle = this.navParams.data.textEle;
      console.log(this.contentEle);
      //console.log(this.textEle);
      //this.background = this.getColorName(this.contentEle.style.backgroundColor);
      
      this.setFontFamily();
    }
  }

  getColorName(background) {
    let colorName = 'white';

    if (!background) return 'white';

    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

  setFontFamily() {
    // if (this.textEle.style.fontFamily) {
    //   this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    // }
  }

  changeBackground(color) {
    this.background = color;
    console.log("change color");
    console.log(this.contentEle);
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    //this.textEle.style.color = this.colors[color].fg;
//     let elm = <HTMLElement>document.querySelector("ion-content");
// elm.style.backgroundColor = 'black';
  }

  changeFontSize(direction) {
    // this.textEle.style.fontSize = direction;
  }

  changeFontFamily() {
    // if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }

}
