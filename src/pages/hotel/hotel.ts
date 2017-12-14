import { Component } from '@angular/core';
import { NavController,ToastController,ModalController  } from 'ionic-angular';
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
   
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public toastCtrl: ToastController,public storage : Storage,public api : HttpServiceProvider) {
 
     
      this.storage.get('events').then((val) => {
      
        val = JSON.parse(val);


        for (var i = 0; i < val.length; i++) {

            let data = val[i];

          
            let startTime = data.start.split(" "); 
            let endTime = data.end.split(" ");

            let sTime = startTime[1];
            let eTime = endTime[1];

            sTime = moment(sTime, ["h:mm A"]).format();
            eTime = moment(eTime, ["h:mm A"]).format();

            sTime = sTime.split('T');
            eTime = eTime.split('T');

          
            startTime = moment( new Date(startTime[0])).format();
            endTime = moment( new Date(endTime[0])).format();

            startTime = startTime.split('T')
            endTime = endTime.split('T');
              
            startTime = startTime[0]+'T'+sTime[1];
            endTime = endTime[0]+'T'+eTime[1];  

             
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

    
    }




    changeMode(mode) {
        this.calendar.mode = mode;
    }

 
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {

    console.log(event);
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: event});
    modal.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    
  }

}
