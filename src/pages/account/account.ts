import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public nav: NavController, public storage : Storage) {
  }

  // logout
  logout() {
  	this.storage.clear();
    this.nav.setRoot(LoginPage);
  }
}
