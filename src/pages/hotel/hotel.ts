import { Component } from '@angular/core';
import { NavController,ModalController,AlertController,ToastController  } from 'ionic-angular';
import * as moment from 'moment';

import {HttpServiceProvider} from "../../providers/http-service/http-service"
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html'
})
export class HotelPage {

 // public calendarEvents;
  

   eventSource;
    viewTitle;
    events = [];
    
    e = []
    

    isToday: boolean;
    selectedDay = new Date();
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.
   
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public toastCtrl: ToastController, private alertCtrl: AlertController,public storage : Storage,public api : HttpServiceProvider) {
 
     
      this.storage.get('events').then((val) => {
        console.log('Your age is', JSON.parse(val));

        val = JSON.parse(val);


        for (var i = 0; i < val.length; i++) {

            let data = val[i];

            console.log(data);

            let startTime = data.start.split(" "); 
            let endTime = data.end.split(" ");

            let sTime = startTime[1];
            let eTime = endTime[1];

            sTime = moment(sTime, ["h:mm A"]).format();
            eTime = moment(eTime, ["h:mm A"]).format();

            sTime = sTime.split('T');
            eTime = eTime.split('T');

            console.log(sTime,eTime);

            startTime = moment( new Date(startTime[0])).format();
            endTime = moment( new Date(endTime[0])).format();

            startTime = startTime.split('T')
            endTime = endTime.split('T');
              
            startTime = startTime[0]+'T'+sTime[1];
            endTime = endTime[0]+'T'+eTime[1];  

            console.log(startTime);
            console.log(endTime);
             
            this.events.push({
              location : data.location,
              summary : data.summary,
              title: data.title,
              startTime: new Date(startTime),
              endTime: new Date(endTime),
              allDay: false
            });

          

          
      }
        
        this.eventSource = this.events;
        console.log(this.eventSource);

      });

      // this.e = [{startTime: "2017-11-25T12:00:00+05:00", endTime: "2017-11-25T12:00:00+05:00", allDay: false},{startTime: "2017-11-26T17:23:00+05:00", endTime: "2017-11-28T17:23:00+05:00", allDay: false}];

      


    }


  //  ionViewCanEnter() {
  //   console.log("in ionViewCanEnter");


  //    return new Promise((resolve, reject) => {    
     
  //      this.storage.get('sessionToken').then(val =>{
  //         this.sessionToken = val;
  //         console.log(this.sessionToken);
  //         this.api.getDashboardData(this.sessionToken).map(res=>res.json()).subscribe(data=>{
           
  //           this.calendarEvents = data.calendar;
  //           console.log(this.calendarEvents.length);

             
  //               for (var i = 0; i < this.calendarEvents.length; ++i) {

  //                 console.log(this.calendarEvents[i]);
  //                 console.log("running");
  //                 this.loadEvents(this.calendarEvents[i]);
  //               }
                 


  //                 setTimeout(() => {
  //                   this.eventSource = this.events;
  //                    resolve(data);
  //                 },3000);
            
               
  //         },err=>{
  //           console.log(err);
  //           let toast = this.toastCtrl.create({
  //             message: 'An error occured',
  //             duration: 3000,
  //             position: 'top',
  //             cssClass: 'dark-trans',
  //             closeButtonText: 'OK',
  //             showCloseButton: true
  //           });
  //           toast.present();
  //           reject(err);
  //         });
  //     });


  //   });

  // }

   

   // loadEvents(data) {
   //   // console.log(data);
   //   console.log("In load events");

   //    let startTime = data.start.split(" "); 
   //    let endTime = data.end.split(" ");

   //    startTime = moment( new Date(startTime[0])).format();
   //    endTime = moment( new Date(endTime[0])).format();

    
   //    this.events.push({
   //        title: data.title,
   //        startTime:new Date(startTime),//new Date(startTime[0]),
   //        endTime:new Date(endTime),//new Date(endTime[0]),
   //        allDay: false
   //    });

   //    // this.eventSource = this.events;

   //    // console.log(this.eventSource);
   //  }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

  // addEvent() {
  //   let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
  //   modal.present();
    

  //   modal.onDidDismiss(data => {
  //     console.log(data)
      
  //     if (data) {
  //       var dbData = {};
  //       Object.assign(dbData,data)
  //       let eventData = data;
  //       // before
  //       console.log(data.startTime);
  //       console.log(data.endTime);
 
  //       eventData.startTime = new Date(data.startTime);
  //       eventData.endTime = new Date(data.endTime);
  //       // after
  //       console.log(eventData.startTime);
  //       console.log(eventData.endTime);
  //       console.log(eventData)
  //       this.events.push(eventData);
  //       this.eventSource = [];
        
       
  //       setTimeout(() => {
  //         this.eventSource = this.events;
          
  //         // this.db.list(this.path).push(dbData);
  //       });
  //     }
  //   });
  // }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {

    console.log(event);

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    
  }

}
