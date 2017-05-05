import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddContactPage } from '../pages/add-contact/add-contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InfoService } from '../infoService';

import {
  FIREBASE_PROVIDERS, defaultFirebase,
  //AngularFire, AuthMethods, AuthProviders, firebaseAuthConfig,
  AngularFireModule
} from 'angularfire2';
import {
        Http,
        HttpModule,
        RequestOptions,
        RequestMethod,
        ConnectionBackend} from "@angular/http";


const COMMON_CONFIG = {
  apiKey: "AIzaSyDO0U3lXIYqFbYn2n0-yVi61bywbW6dKVM",
  authDomain: "ionic2-firebase-crud-jaime.firebaseapp.com",
  //projectId: "ionic2-firebase-crud-jaime",
  databaseURL: "https://ionic2-firebase-crud-jaime.firebaseio.com",
  storageBucket: "ionic2-firebase-crud-jaime.appspot.com",
  messagingSenderId: "768011741989"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddContactPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(COMMON_CONFIG)
  ],
  bootstrap: [
        IonicApp,

      ],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddContactPage
  ],
  providers: [
    FIREBASE_PROVIDERS,
    defaultFirebase(COMMON_CONFIG),
    StatusBar,
    SplashScreen,
    InfoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
