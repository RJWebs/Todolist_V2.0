import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
//import { HomePage } from '../pages/home/home';
import { MenuController } from 'ionic-angular';
import { NavController, Events } from 'ionic-angular';
import {TaskserviceProvider} from '../providers/taskservice/taskservice';
import { FinishtaskPage } from "../pages/finishtask/finishtask";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  finishtaskPage = FinishtaskPage;

  allList = 0;
  personal = 0;
  office = 0;
  wishlist = 0;
  shopping = 0;
  finishedtask = 0;

  STORAGE_KEY = 'todo_item'; 
  FINISHED_KEY = 'completed_item';

  @ViewChild('content') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen,public menu: MenuController,public taskservice:TaskserviceProvider,
              public storage: Storage, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  //   events.subscribe('user:created', () => {
  //     this.getBadgeData();
  //   console.log('Welcome');
  // });
  }

  ngOnInit() {
    this.getBadgeData();
  }

  ionViewDidEnter() {
    console.log("menu");
    // this.getBadgeData();
  }

  //get data to display on menu badges
  getBadgeData() {
    this.allList = 0;
    this.personal = 0;
    this.office = 0;
    this.wishlist = 0;
    this.shopping = 0;
    this.finishedtask = 0;

    this.storage.get(this.STORAGE_KEY).then(result => {
      if(result) {
        result.forEach(element => {
          if(element.tasktype === "Personal") {
            this.personal ++;
          }
          if(element.tasktype === "Office") {
            this.office ++;
          }
          if(element.tasktype === "Wishlist") {
            this.wishlist ++;
          }
          if(element.tasktype === "Shopping") {
            this.shopping ++;
          }
          this.allList ++;
        });
      }
    });

    this.storage.get(this.FINISHED_KEY).then(result => {
      if(result) {
        result.forEach(element => {
          this.finishedtask ++;
        });
      }
      console.log(this.finishedtask);
    });
  }

  selectList(listname : any)
  {
      this.taskservice.setTaskType(listname);
      this.nav.push(TabsPage);
      this.menu.close();    
  }

  selectFinishedList() {
    this.closeMenu();
    this.nav.push(this.finishtaskPage);
  }

  closeMenu() {
    this.menu.close();
  }
}
