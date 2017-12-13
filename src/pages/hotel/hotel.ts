import { Component } from '@angular/core';
import { NavController,AlertController,ToastController  } from 'ionic-angular';
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
   
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private alertCtrl: AlertController,public storage : Storage,public api : HttpServiceProvider) {
 
     
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




    changeMode(mode) {
        this.calendar.mode = mode;
    }

 
 
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
