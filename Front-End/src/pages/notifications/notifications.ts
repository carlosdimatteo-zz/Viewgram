import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpUserProvider } from '../../providers/http-user/http-user';
import { Storage } from '@ionic/storage';
import { PostPage } from '../post/post';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  posts=[]

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpUserProvider,private storage:Storage,public alertCtrl:AlertController) {
  }

  goToPost(id){
    console.log(id);
    this.navCtrl.push(PostPage,{id:id});
  }

  ionViewWillEnter() {
    console.log('will enter  NotificationsPage');
    this.posts=[];
      this.storage.get("user_id").then((data)=>{

        this.http.notifications(data).subscribe((res)=>{
          if(res.status==200){
            this.posts=res.data
            console.log("posts where you are tagged: "+JSON.stringify(this.posts))

          }else{
              let alert = this.alertCtrl.create({
                title:"Could not load posts",
                buttons:["OK"]
              });
              alert.present();
          }
        })

      })
    
  }

}
