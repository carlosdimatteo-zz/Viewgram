import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PostPage } from '../post/post';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  json:Object;
  user_id:string;
  mypost = [];
  posts : '';

constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider,private storage: Storage,public app:App) {
}

ionViewDidLoad() {
  console.log('ionViewDidLoad ProfilePage');
  this.storage.get("user_id").then((data)=>{
    this.user_id=data;
  console.log(this.user_id);
  this.fetchProfile();});
}

  goToPost(id){
    console.log("POST ID: "+id);
    this.navCtrl.push(PostPage,{id:id});
  }


  followerPage(id){
        
        console.log("navigating id:"+id);
        
  }

  followingPage(id){
    console.log("navigating id:"+id);
  }

  goToEditProfile(){
    this.navCtrl.push(EditProfilePage,{json:this.json});
  }
  goToLogin(){
    this.storage.clear()
    this.app.getRootNav().setRoot(LoginPage);
  }

fetchProfile() {
  this.httpService.fetch(null,"GET","Profile.php?user_id="+this.user_id)
    .subscribe((res) => {
      console.log("Response: "+JSON.stringify(res));
      this.json=res.data;
      console.log("JSON:"+JSON.stringify(this.json));
      if(res.status === 200) {
        res.posts.map((p) => {
          p.username = res.data.username;
          this.mypost.push(p);
        });
      }
      console.log("my post: "+JSON.stringify(this.mypost));
    });
    
}


}