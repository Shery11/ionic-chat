import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NavController,LoadingController,ToastController} from "ionic-angular";

import {LoginPage} from "../login/login";
import {HttpServiceProvider} from "../../providers/http-service/http-service"



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(private _fb: FormBuilder, public nav: NavController,public api : HttpServiceProvider,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.onRegisterForm = this._fb.group({
      first_name: ['', Validators.compose([
        Validators.required
      ])],
      last_name: ['', Validators.compose([
        Validators.required
      ])],      
      email: ['', Validators.compose([
        Validators.required
      ])],
      phone_number: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }  

  // register and go to home page
  register(data) {


       let loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box">Registering your account</div>
          </div>`,
      });

     loading.present();

     console.log('clicked')
     console.log(data);

      this.api.register(data).map(res=> res.json()).subscribe(data=>{
        loading.dismiss();
        console.log(data);

         if(data.status === "Success"){
          console.log("User registered in");
          this.nav.setRoot(LoginPage);
        }else{


           let toast = this.toastCtrl.create({
              message: 'An error occured!',
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

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
