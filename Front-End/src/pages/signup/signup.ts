import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from './../login/login';
import { HttpAuthProvider } from './../../providers/http-auth/http-auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import {Storage} from '@ionic/storage'
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    signUpForm: FormGroup;
    json:{name:string,username:string,email:string,password:string,bio:string}
    resJson:{user_id:number,res:string,status:number}

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private httpService:HttpAuthProvider,private storage:Storage,public alertCtrl:AlertController) {
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
  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }


  signup(){

    this.json=this.signUpForm.value
    this.json.bio=""
    console.log("generated json: "+JSON.stringify(this.json))

    this.httpService.signup(this.json)
    .subscribe((res) => {
      console.log(res);
      this.resJson=res;

        //  console.log(this.resJson.user_id);
         if(this.resJson.status==200){
       this.navCtrl.setRoot( LoginPage );
         }else{
           let alert = this.alertCtrl.create({
             title:"Sign Up unsuccesfull",
             subTitle:this.resJson.res,
             buttons:["OK"]
           });
           alert.present();
         }
      
      console.log(this.resJson);
    });
  }

}
