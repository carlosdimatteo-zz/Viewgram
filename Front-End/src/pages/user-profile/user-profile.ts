import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import { ProfilePage } from '../profile/profile';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
      json:Object;
      user_id:string;
  constructor(public httpService:HttpServicesProvider ,public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    this.storage.get("user_id").then((data)=>{
      this.user_id=data;
    console.log(this.user_id);
    this.fetchProfile();});
  }


  goToPost(id){
    console.log(id);
    this.navCtrl.push(PostPage,{id:id});
  }

  follow(){
    this.httpService.fetch(null,"GET","follow.php?followed_id="+this.navParams.get('id')+"&follower_id="+this.user_id)
    .subscribe((res) => {
      console.log(res);
      this.json=res;
      console.log(this.json);
    })
  }

  unfollow(){
    this.httpService.fetch(null,"GET","unfollow.php?followed_id="+this.navParams.get('id')+"&follower_id="+this.user_id)
    .subscribe((res) => {
      console.log(res);
      this.json=res;
      console.log(this.json);
    })
  }


  fetchProfile() {
    if(this.navParams.get('id')==this.user_id){
      this.navCtrl.setRoot(ProfilePage);
    }else{
    this.httpService.fetch(null,"GET","UserProfile.php?user_id="+this.navParams.get('id')+"&nav_user="+this.user_id)
      .subscribe((res) => {
        console.log(res);
        this.json=res;
        console.log(this.json);
      })
  }}


}
