import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
//import { HomePage } from '../pages/home/home';
import { MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {TaskserviceProvider} from '../providers/taskservice/taskservice';
import { FinishtaskPage } from "../pages/finishtask/finishtask";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  finishtaskPage = FinishtaskPage;
  @ViewChild('content') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, 
  splashScreen: SplashScreen,public menu: MenuController,public taskservice:TaskserviceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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
