import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

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
  constructor(
    public navCtrl: NavController,
    private storage:Storage,
    private httpServices: HttpServicesProvider) {

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
