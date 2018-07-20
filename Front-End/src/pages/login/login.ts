import { HttpServicesProvider } from './../../providers/http-services/http-services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import {Storage} from '@ionic/storage'
import { HomePage } from '../home/home';
import { generateJson } from '../../helpers/generateJson';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
      json:{username:string,password:string}
      resJson:{user_id:number}

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     public formBuilder: FormBuilder,
     public httpService:HttpServicesProvider,
     private storage:Storage,
     public alertCtrl:AlertController) {
    this.json={username:"",password:""}
    this.resJson={user_id:0}
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignup(){
    this.navCtrl.setRoot(SignupPage);
  }

  loginUser(){
    console.log("Username:" + this.loginForm.value.username);
    console.log("Password:" + this.loginForm.value.password);
    this.json=this.loginForm.value
    console.log("generated json: "+JSON.stringify(this.json))
    
    this.httpService.fetch(this.json,"POST","login.php")
    .subscribe((res) => {
      console.log(res);
      this.resJson=res;
      if(res.status=200){
         this.storage.set('user_id',this.resJson.user_id);
         this.storage.get("user_id").then((data)=>console.log(data));
         console.log(this.resJson.user_id);
         if(this.resJson.user_id!== undefined){
       this.navCtrl.setRoot( TabsPage );
         }else{
           let alert = this.alertCtrl.create({
             title:"Login unsuccesfull",
             subTitle:"Check your credentials",
             buttons:["OK"]
           });
           alert.present();
         }
      }
      console.log(this.resJson);
    });
  }
}
