import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { UserProfilePage } from '../user-profile/user-profile';
import { Storage} from '@ionic/storage';
import { UserProfilePage } from '../user-profile/user-profile';
import { HomePage } from '../home/home';
import { HttpInteractionProvider } from '../../providers/http-interaction/http-interaction';
import { HttpPostsProvider } from '../../providers/http-posts/http-posts';
/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
    user_id:number;
   commentJson=<any>{}
    json=<any>{};
    commentBox:Boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpPost :HttpPostsProvider,public httpInt:HttpInteractionProvider,private storage:Storage) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.storage.get("user_id").then((data)=>{
      this.user_id=data;
    console.log(this.user_id);
    this.fetchPost();});
    
    
  }


  

  report(){
    this.httpInt.report(this.user_id,this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
      let resjson=res
      console.log(resjson);
      if(resjson.data>5){
        this.navCtrl.setRoot(HomePage);
      }
      this.fetchPost();
    });
  }

  goToProfile(id){
    console.log(id);
    this.navCtrl.push(UserProfilePage,{id:id});
  }

  ToggleCommentBox(){
      this.commentBox=!this.commentBox;
      console.log(this.commentBox);
  }


    comment(){
      console.log("comment attempt");
      this.commentJson.id_user=this.user_id;
      this.commentJson.post_id=this.json.data.post_id;
      this.commentJson.created_at= new Date().toUTCString();
      console.log(this.commentJson);
      this.httpInt.comment(this.user_id,this.navParams.get("id"),this.commentJson)
      .subscribe((res) => {
        console.log(res);
        let resjson=res;
        console.log(resjson);
        this.commentJson={}
        this.commentBox=!this.commentBox
        this.fetchPost();
      });
    }

    deleteComment(comment){
      this.httpInt.deleteComment(comment).subscribe((res)=>{
        console.log(res)
        this.fetchPost();
      })
    }

    like(){
      this.httpInt.like(+this.user_id,this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
     let resjson=res
      console.log(resjson);
      this.fetchPost();
    });
    }

    dislike(){
      this.httpInt.dislike(this.user_id,this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
      let resjson=res;
      console.log(resjson);
      this.fetchPost();
    });
    }


  fetchPost(){
    this.httpPost.getPost(+this.user_id,this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
      this.json=res;
      console.log(this.json);
    })

    
  }




}
