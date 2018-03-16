import { Component} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SetbackgroundProvider } from "../../providers/setbackground/setbackground";
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import {TaskserviceProvider} from '../../providers/taskservice/taskservice';
import {TabsPage} from '../tabs/tabs';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  //rootPage:any = TabsPage;

  myDate : any = new Date;
  STORAGE_KEY = 'todo_item';
  // background: string;
  contentEle: any;
  // textEle: any;
  fontFamily: 'Arial';
  // fontsize;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public setBackgroundProvider: SetbackgroundProvider,public storage: Storage,
              private datePipe: DatePipe,private taskservice : TaskserviceProvider,public app: App) {
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

  changeBackground(imageurl) {
    // this.background = color;
    // this.contentEle.style.backgroundColor = this.colors[color].bg;
    this.contentEle.style.backgroundImage = 'url('+imageurl+')';
    this.setBackgroundProvider.setBackground(imageurl);
    //this.textEle.style.color = this.colors[color].fg;
  }

  changeFontSize(direction) {
    // this.fontsize = '10px';
    // this.textEle.style.fontSize = direction;
    // this.contentEle.style.fontSize = direction;
  }

  changeFontFamily(fonttype) {
    console.log(fonttype);
    this.fontFamily = fonttype;
    // if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }

  sortByDate(date = new Date)
  {
    this.getDataFromStorageByDate(this.datePipe.transform(date, 'yyyy-MM-dd'));
    
    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(TabsPage);
    });

  }

   getDataFromStorageByDate(date : any)
  {
      this.taskservice.setSortDate(date); 
  }

  sortByDateAll()
  {
    this.taskservice.setSortDateAll();

    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(TabsPage);
    });
  }
  sortByDateSelect()
  {
    console.log(this.myDate);
    this.taskservice.setSortDate(this.myDate);

    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(TabsPage);
    });  

  }
}
