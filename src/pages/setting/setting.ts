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
  fontFamily;
  default: boolean;

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
    console.log('ionViewDidLoad HomePage');

    this.setBackgroundProvider.getBackground().then((val)=>{
      if(val==='Default') {
        this.default = true;
      }
      else {
        this.default = false;
      }
    })
  } 

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.imageEle = this.navParams.data.imageEle;
      console.log(this.contentEle);
      console.log(this.imageEle);
      
      // this.setFontFamily();
    }
  }

  // getColorName(background) {
  //   let colorName = 'white';

  //   if (!background) return 'white';

  //   for (var key in this.colors) {
  //     if (this.colors[key].bg == background) {
  //       colorName = key;
  //     }
  //   }

  //   return colorName;
  // }

  // setFontFamily() {
  //   // if (this.textEle.style.fontFamily) {
  //   //   this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
  //   // }
  // }

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
    console.log(color);
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    let bcolor = this.colors[color].bg;
    console.log(bcolor);
    this.setBackgroundProvider.setBackgroundColor(bcolor);
  }

  // changeFontSize(direction) {
  //   // this.fontsize = '10px';
  //   // this.textEle.style.fontSize = direction;
  //   // this.contentEle.style.fontSize = direction;
  // }

  changeFontFamily(fonttype) {
    console.log(fonttype);
    this.fontFamily = fonttype;
    this.contentEle.style.fontFamily = fonttype;
  }

}
