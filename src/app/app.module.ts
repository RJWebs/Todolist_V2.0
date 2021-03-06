import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TaskserviceProvider } from '../providers/taskservice/taskservice';
import { IonicStorageModule } from '@ionic/storage';
import { AddtaskPage } from "../pages/addtask/addtask";
import { ViewtaskPage } from "../pages/viewtask/viewtask";
import { UpdatetaskPage } from "../pages/updatetask/updatetask";
import { FinishtaskPage } from "../pages/finishtask/finishtask";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SettingPage } from "../pages/setting/setting";
import { SetbackgroundProvider } from '../providers/setbackground/setbackground';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddtaskPage,
    ViewtaskPage,
    UpdatetaskPage,
    FinishtaskPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddtaskPage,
    ViewtaskPage,
    UpdatetaskPage,
    FinishtaskPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TaskserviceProvider,
    LocalNotifications,
    SetbackgroundProvider,
    DatePipe
  ]
})
export class AppModule {}
