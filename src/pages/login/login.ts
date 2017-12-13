import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController, AlertController, ToastController, MenuController,LoadingController} from "ionic-angular";
import { Storage } from '@ionic/storage';

import  {HttpServiceProvider} from "../../providers/http-service/http-service"

import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(private _fb: FormBuilder, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,public api: HttpServiceProvider,public storage: Storage,public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });

     
     // this is just for testing
    this.storage.get('sessionToken').then((val) => {
     console.log('Your token is', val);
    });

    this.storage.get('unique_id').then((val) => {
     console.log('Your uniquie id is', val);
    });



  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login(data) {
    
    console.log("clicked");
    console.log(data);


    let loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box">Logging in</div>
          </div>`,
   });  
      
       

     loading.present();

    this.api.login(data).map(res => res.json()).subscribe(data=>{
        
        console.log(data);
        loading.dismiss();

        if(data.status === "Success"){
          console.log("User logged in");
          this.storage.set('sessionToken', data.sessiontoken );
          this.storage.set('unique_id', data.unique_id);
          this.storage.set('email', data.email);
          this.storage.set('first_name', data.first_name);
          this.storage.set('last_name', data.last_name);
          
          
          this.nav.setRoot(HomePage);
        }else{


           let toast = this.toastCtrl.create({
              message: 'Invalid Email or password',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
        }


        
     },err=>{
       console.log(err);
       loading.dismiss();
        let toast = this.toastCtrl.create({
              message: 'An unknown error occured',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
        });
        toast.present();
     });
    


    
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
