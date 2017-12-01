import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {HotelService} from "../providers/hotel-service";
import {PlaceService} from "../providers/place-service";
import {ActivityService} from "../providers/activity-service";
import {CarService} from "../providers/car-service";
import {TripService} from "../providers/trip-service";

import {MyApp} from "./app.component";

import {AccountPage} from "../pages/account/account";
import {CarDetailPage} from "../pages/car-detail/car-detail";
import {CarsPage} from "../pages/cars/cars";
import {CheckoutCarPage} from "../pages/checkout-car/checkout-car";
import {CheckoutHotelPage} from "../pages/checkout-hotel/checkout-hotel";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {HomePage} from "../pages/home/home";
import {HotelPage} from "../pages/hotel/hotel";
import {HotelDetailPage} from "../pages/hotel-detail/hotel-detail";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {ReviewsPage} from "../pages/reviews/reviews";
import {SearchCarsPage} from "../pages/search-cars/search-cars";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {SearchTripsPage} from "../pages/search-trips/search-trips";
import {TabReviewsPage} from "../pages/tab-reviews/tab-reviews";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import { HttpServiceProvider } from '../providers/http-service/http-service';

import { NgCalendarModule  } from 'ionic2-calendar';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// import services
// end import services
// end import services

// import pages
// end import pages


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
    CarDetailPage,
    CarsPage,
    CheckoutCarPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ReviewsPage,
    SearchCarsPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TripDetailPage,
    TripsPage
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
    CarDetailPage,
    CarsPage,
    CheckoutCarPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ReviewsPage,
    SearchCarsPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TripDetailPage,
    TripsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    HotelService,
    PlaceService,
    ActivityService,
    CarService,
    TripService,
    CarService,
    TripService,
    HttpServiceProvider
  ]
})

export class AppModule {
}
