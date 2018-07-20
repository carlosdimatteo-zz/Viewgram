import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    loggedIn:number;
  constructor(public navCtrl: NavController,private storage:Storage) {

  }

  ionViewDidLoad(){
    this.storage.get('user_id').then((data)=>{
      if(data){
        this.loggedIn=data;
      }else{
        this.loggedIn=0;
      }
    })
  }

}
