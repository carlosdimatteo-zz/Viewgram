import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { PostPage } from '../post/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    loggedIn:number;
    img: string = '';
    msg: string = '';
    status: string = '';
    posts = [];
    svhost: string ="http://192.168.0.106:8080/viewgram";
    user_id:number;
  constructor(
    public navCtrl: NavController,
    private storage:Storage,
    private httpServices: HttpServicesProvider) {

      this.svhost= "http://192.168.0.106:8080/viewgram";
    this.storage.get("user_id").then((data)=>{
      this.user_id=data;
    console.log("id from storage:"+this.user_id);
    });

  }

  goToPost(id){
    console.log(id);
    this.navCtrl.push(PostPage,{id:id});
  }

  ionViewWillEnter(){
    this.storage.get('user_id').then((data)=>{
      if(data){
        this.loggedIn=data;
        console.log("data from storage"+this.loggedIn)
        this.posts = [];
        console.log("is this still running?")
    this.httpServices.fetch(null, 'GET', 'home.php?id='+this.loggedIn)
      .subscribe(res => {
        console.log("data from response in home: "+JSON.stringify(res.data));
        res['data'].forEach(element => {
          this.posts.push(element);
          // this.getFiles()
        });
        console.log("this is the json array of posts: "+JSON.stringify(this.posts));
      })
      }else{
        this.loggedIn=0;
      }
    })
    
  }

  // getFiles(){
  //   for (let post in this.posts){
  //     let location = post.post_filename.split("files/posts")[0]
  //     let newFilename=post.post_filename.replace(location,"http://localhost:8080/viewgram/")
  //     post.post_filename = newFilename
  //   }
  // }
  

}
