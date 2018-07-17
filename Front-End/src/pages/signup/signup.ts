import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from './../login/login';
import { HttpServicesProvider } from './../../providers/http-services/http-services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import {Storage} from '@ionic/storage'
import { generateJson } from '../../helpers/generateJson';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    signUpForm: FormGroup;
    json:{name:string,username:string,email:string,password:string,bio:string}
    resJson:{user_id:number,res:string,status:number}

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private httpService:HttpServicesProvider,private storage:Storage,public alertCtrl:AlertController) {
    this.signUpForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      username:['',Validators.required],
      password: ['',Validators.required]
    });
    this.json={name:"",username:"",password:"",email:"",bio:""}
    this.resJson={user_id:0,res:"",status:0}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){

    this.json=this.signUpForm.value
    this.json.bio=""
    console.log("generated json: "+JSON.stringify(this.json))

    this.httpService.fetch(this.json,"POST","register.php")
    .subscribe((res) => {
      console.log(res);
      this.resJson=res;

         console.log(this.resJson.user_id);
         if(this.resJson.status=200){
       this.navCtrl.setRoot( LoginPage );
         }else{
           let alert = this.alertCtrl.create({
             title:"Sign Up unsuccesfull",
             subTitle:"Check your credentials",
             buttons:["OK"]
           });
           alert.present();
         }
      
      console.log(this.resJson);
    });
  }

}
