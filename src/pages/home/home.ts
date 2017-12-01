import {Component,OnInit} from "@angular/core";
import {NavController, MenuController, ToastController,ModalController, PopoverController} from "ionic-angular";
import {NotificationsPage} from "../notifications/notifications";
import {AccountPage} from "../account/account";
import {HttpServiceProvider} from "../../providers/http-service/http-service"
import { Storage } from '@ionic/storage';

import {LoginPage} from "../login/login";
import {HotelPage} from "../hotel/hotel";
import {HotelDetailPage} from "../hotel-detail/hotel-detail";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit  {
 
  private sessionToken;
  public dashboardData;
  public invoices;
  public players;
  public teams;
  public fieldStatus;
  shownGroup = null;


  constructor(public nav: NavController, public menuCtrl: MenuController, public toastCtrl: ToastController, public modalCtrl: ModalController, public popoverCtrl: PopoverController,public storage : Storage,public api : HttpServiceProvider) {
    this.menuCtrl.swipeEnable(true, 'authenticated');
   }


   ngOnInit() {

    }

   ionViewCanEnter() {
    console.log("in ionViewCanEnter");


     return new Promise((resolve, reject) => {    
     
       this.storage.get('sessionToken').then(val =>{
          this.sessionToken = val;
          console.log(this.sessionToken);
          this.api.getDashboardData(this.sessionToken).map(res=>res.json()).subscribe(data=>{
            this.fieldStatus = data.field_status.title;
            this.players = data.players;
            this.teams = data.teams;
            this.invoices = data.invoices;

            

            console.log(data);

            this.storage.set('events', JSON.stringify(data.calendar));
            this.storage.set('username', data.first_name +" "+ data.last_name);

          
            resolve(data);
          },err=>{
            console.log(err);
            let toast = this.toastCtrl.create({
              message: 'Invalid Email or password',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
            reject(err);
          });
      });


    });

  }


  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  messageTeam(teamName){
    console.log(teamName);
    this.nav.push(HotelDetailPage,{'teamName' : teamName});
  }


  openCalendar(){
    this.nav.push(HotelPage);
  }

 

  // to go account page
  goToAccount() {
    this.nav.push(AccountPage);
  }

  presentNotifications(myEvent) {
    console.log("Notification");
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

// 
