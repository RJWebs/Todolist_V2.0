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
  imageEle: any;
  textEle: any;

  default: boolean;
  font = '';
  imageurl: any;
  bgcolor: any;

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
              public setBackgroundProvider: SetbackgroundProvider,public storage: Storage,
              private datePipe: DatePipe,private taskservice : TaskserviceProvider,public app: App) {
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
        this.imageurl = val;
        console.log(this.imageurl);
      }
    });

    this.setBackgroundProvider.getBackgroundColor().then((val)=>{
      if(this.colors.white.bg === val) {
        this.bgcolor = 'white';
      }
      if(this.colors.tan.bg === val) {
        this.bgcolor = 'tan';
      }
      if(this.colors.blue.bg === val) {
        this.bgcolor = 'blue';
      }
      if(this.colors.gray.bg === val) {
        this.bgcolor = 'gray';
      }
    });

    this.setBackgroundProvider.getFontType().then((val)=>{
      this.font = val;
    });
  } 

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.imageEle = this.navParams.data.imageEle;
      this.textEle = this.navParams.data.textEle;
    }
  }

  changeBackground(imageurl) {
    this.imageurl = imageurl;

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
    this.bgcolor = color;
    this.contentEle.style.backgroundColor = this.colors[color].bg;

    let bcolor = this.colors[color].bg;
    this.setBackgroundProvider.setBackgroundColor(bcolor);
  }

  changeFontFamily(fonttype) {
    this.textEle.style.fontFamily = fonttype;
    this.setBackgroundProvider.setFontType(fonttype);
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
