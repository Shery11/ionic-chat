import {Component, ViewChild} from "@angular/core";
import {NavController,Content,NavParams} from "ionic-angular";
import { AngularFireDatabase} from 'angularfire2/database';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-hotel-detail',
  templateUrl: 'hotel-detail.html'
})
export class HotelDetailPage {
  // hotel info
  public teamName;
  
   @ViewChild(Content) content: Content;
   username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];


  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,public storage : Storage) {

      this.teamName = this.navParams.get('teamName');
      
      this.storage.get('username').then(val=>{
        this.username = val;
        console.log(val);
      });

      this._chatSubscription = this.db.list('/'+this.teamName).valueChanges().subscribe( data => {
        console.log(data);
        this.messages = data;
        this.scrollToBottom();
      });
    }

    sendMessage() {
      
     if( this.message !== ''){

     
      this.db.list('/'+this.teamName).push({
        username: this.username,
        message: this.message,
        time : new Date().toISOString()
      }).then( () => {
        // message is sent
      })
      this.message = '';
      this.scrollToBottom();
     } 

    }

    ionViewDidLoad() {
      // this.db.list('/chat').push({
      //   specialMessage: true,
      //   message: `${this.username} has joined the room`
      // });
    }

    ionViewWillLeave(){
      // this._chatSubscription.unsubscribe();
      // this.db.list('/chat').push({
      //   specialMessage: true,
      //   message: `${this.username} has left the room`
      // });
    }

      scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 200)
    }
 

  
}
