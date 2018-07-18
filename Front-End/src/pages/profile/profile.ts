import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { Storage } from '@ionic/storage';
import { EditProfilePage } from '../edit-profile/edit-profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  json:Object;
  user_id:string;

constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider,private storage: Storage) {
}

ionViewDidLoad() {
  console.log('ionViewDidLoad ProfilePage');
  this.storage.get("user_id").then((data)=>{
    this.user_id=data;
  console.log(this.user_id);
  this.fetchProfile();});
}

  goToPost(id){
    console.log(id);
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

fetchProfile() {
  this.httpService.fetch(null,"GET","Profile.php?user_id="+this.user_id)
    .subscribe((res) => {
      console.log(res);
      this.json=res.data;
      console.log(this.json);
    })
}


}