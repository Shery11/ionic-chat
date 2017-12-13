import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {


  firstName;
  lastName;
  email;	
  push = true;
  

  constructor(public nav: NavController, public storage : Storage) {

  	 // this is just for testing
    this.storage.get('first_name').then((val) => {
     console.log('Your token is', val);
     this.firstName = val;
    });

    this.storage.get('last_name').then((val) => {
     console.log('Your uniquie id is', val);
     this.lastName = val;
    });

    this.storage.get('email').then((val) => {
     console.log('Your uniquie id is', val);
     this.email = val;
    });

     this.storage.get('push').then((val) =>{
        this.push = val;
     })    



    
  }
   
  updatePush(event){
    this.storage.set('push',event);
  }

  // logout
  logout() {
   
    this.storage.clear();
    this.nav.setRoot(LoginPage);
  }
}
