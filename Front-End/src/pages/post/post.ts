import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { UserProfilePage } from '../user-profile/user-profile';
import { Storage} from '@ionic/storage';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { UserProfilePage } from '../user-profile/user-profile';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService :HttpServicesProvider,private storage:Storage) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.storage.get("user_id").then((data)=>{
      this.user_id=data;
    console.log(this.user_id);
    this.fetchPost();});
    
    
  }


  

  report(){
    this.httpService.fetch(null,"GET","report.php?user_id="+this.user_id+"&post_id="+this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
      let resjson=res
      console.log(resjson);
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
      this.httpService.fetch(this.commentJson,"POST","comment.php?user_id="+this.user_id+"&post_id="+this.navParams.get("id"))
      .subscribe((res) => {
        console.log(res);
        let resjson=res;
        console.log(resjson);
        this.commentJson={}
        this.commentBox=!this.commentBox
        this.fetchPost();
      });
    }


    like(){
      this.httpService.fetch(null,"GET","like.php?user_id="+this.user_id+"&post_id="+this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
     let resjson=res
      console.log(resjson);
      this.fetchPost();
    });
    }

    dislike(){
      this.httpService.fetch(null,"GET","dislike.php?user_id="+this.user_id+"&post_id="+this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
      let resjson=res;
      console.log(resjson);
      this.fetchPost();
    });
    }


  fetchPost(){
    this.httpService.fetch(null,"GET","post.php?user_id="+this.user_id+"&post_id="+this.navParams.get("id"))
    .subscribe((res) => {
      console.log(res);
      this.json=res;
      console.log(this.json);
    })

    
  }




}
