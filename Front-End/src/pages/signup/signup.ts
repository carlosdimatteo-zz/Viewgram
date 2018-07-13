import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      username:['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    console.log("Name:" + this.myForm.value.name);
    console.log("Email:" + this.myForm.value.email);
    console.log("Username:" + this.myForm.value.username);
    console.log("Password:" + this.myForm.value.password);
    this.navCtrl.setRoot(LoginPage);
  }

}
