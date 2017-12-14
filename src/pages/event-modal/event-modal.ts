import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
 
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
 
  event;
  start;
  end;
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    this.event= this.navParams.get('selectedDay')
    console.log(this.event);

    this.start = moment(this.event.startTime).format('LLLL');
    this.end = moment(this.event.endTime).format('LLLL');
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  
 
}