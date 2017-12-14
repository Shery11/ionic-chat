import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';



import {MyApp} from "./app.component";

import {AccountPage} from "../pages/account/account";
import {HomePage} from "../pages/home/home";
import {HotelPage} from "../pages/hotel/hotel";
import {HotelDetailPage} from "../pages/hotel-detail/hotel-detail";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import { HttpServiceProvider } from '../providers/http-service/http-service';

import { NgCalendarModule  } from 'ionic2-calendar';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


var config = {
    apiKey: "AIzaSyC3A4Gq80srvtp4IBJwhLB2V4iikxZZa3o",
    authDomain: "test-ecf98.firebaseapp.com",
    databaseURL: "https://test-ecf98.firebaseio.com",
    projectId: "test-ecf98",
    storageBucket: "test-ecf98.appspot.com",
    messagingSenderId: "641829195016"
  };

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule, 
    IonicModule.forRoot(MyApp, {
      // mode: 'md', --> uncomment in case you'll do an Web App (PWA) build.
      scrollPadding: false,
      scrollAssist: true, 
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    HttpServiceProvider
  ]
})

export class AppModule {
}
