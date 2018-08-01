import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PostPage } from '../post/post';
import { HttpUserProvider } from '../../providers/http-user/http-user'
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
  liked_posts:any
  posts :any;
  Post : string;
  svhost: string ='http://192.168.56.1:8080//viewgram//';

constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public httpService:HttpUserProvider,
  private storage: Storage,
  public app:App) {
    this.svhost = "http://192.168.56.1:8080//viewgram//";
  
}

ionViewDidLoad() {
  console.log('ionViewDidLoad ProfilePage');
  this.storage.get("user_id").then((data)=>{
    this.user_id=data;
  console.log(this.user_id);});
}

ionViewWillEnter(){
  this.Post ='userPosts';
  this.fetchProfile()
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
  this.httpService.profileData(this.user_id)
    .subscribe((res) => {
      
      if(res.status == 200) {
        console.log("Response: "+JSON.stringify(res));
      this.json=res.data;
      this.posts=res.posts
      this.liked_posts=res.liked_posts
      console.log("JSON:"+JSON.stringify(this.json));
        // res.posts.map((p) => {
        //   p.username = res.data.username;
        //   this.mypost.push(p);
        // });
      }
    });
    
}


}