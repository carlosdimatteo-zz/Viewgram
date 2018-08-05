import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import { ProfilePage } from '../profile/profile';
import { HttpUserProvider } from '../../providers/http-user/http-user';
import { HttpInteractionProvider } from '../../providers/http-interaction/http-interaction';
import { FollowersListPage } from '../followers-list/followers-list';
import { FollowingListPage } from '../following-list/following-list';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
      json:Object;
      user_id:string;
      Post: string;
      followers: object;

  constructor(public httpUser:HttpUserProvider ,public httpInt: HttpInteractionProvider ,public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {

    this.Post = 'userPosts';
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

  followerPage(id){
        
    console.log("navigating id:"+id);
    this.navCtrl.push(FollowersListPage,{json:this.json["data"]});

    
}

followingPage(id){
  console.log("navigating id:"+id);
  this.navCtrl.push(FollowingListPage,{json:this.json["data"]});
}



  follow(){
    this.httpInt.follow(this.navParams.get('id'),this.user_id)
    .subscribe((res) => {
      console.log(res);
      let resjson=res;
      console.log(resjson);
      this.fetchProfile()
    })
  }

  unfollow(){
    this.httpInt.unfollow(this.navParams.get('id'),this.user_id)
    .subscribe((res) => {
      console.log(res);
      let resjson=res;
      console.log(resjson);
      this.fetchProfile()
    })
  }


  fetchProfile() {
    if(this.navParams.get('id')==this.user_id){
      this.navCtrl.setRoot(ProfilePage);
    }else{
    this.httpUser.userProfileData(this.navParams.get('id'),this.user_id)
      .subscribe((res) => {
        console.log(res);
        this.json=res;
        console.log(this.json);
      })
  }}


}
