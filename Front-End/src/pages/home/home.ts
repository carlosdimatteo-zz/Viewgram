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
    // loggedIn:number;
    // img: string = '';
    // msg: string = '';
    // status: string = '';
    posts = [];
    posts_arr = [];
    svhost: string ="http://192.168.0.105:8080/viewgram";
    user_id:number;
    loaded: boolean = false;
  constructor(
    public navCtrl: NavController,
    private storage:Storage,
    private httpServices: HttpServicesProvider) {
      this.svhost= "http://192.168.0.105:8080/viewgram";
      this.storage.get("user_id").then((data)=>{
        this.user_id=data;
        console.log("id from storage:"+this.user_id);
    });
    this.posts = [];

  }

  goToPost(id){
    console.log(id);
    this.navCtrl.push(PostPage,{id:id});
  }

  ionViewWillEnter(){
    this.loaded = false;
    this.posts=[];
    this.showPosts();
      //   this.httpServices.fetch(null, 'GET', 'home.php?id='+this.user_id)
      // .subscribe(res => {
      //   console.log("data from response in home: "+JSON.stringify(res.data));
      //   res['data'].forEach(element => {
      //     this.posts.push(element);
      //     // this.getFiles()
      //   });
      //   console.log("this is the json array of posts: "+JSON.stringify(this.posts));
      // })
     
  }

  showPosts(){
    this.httpServices.userDashboard(`home.php?id=${this.user_id}`).subscribe(
      
      (res)=> {
        console.log('es este'+JSON.stringify(this.user_id));
        if(res.status === 200){
          res.data.map(p => this.posts.push(p));
          this.loaded = true;
          console.log('posts'+JSON.stringify(this.posts));
        }else{
          alert('Error finding posts');
        }
      }
    );
  }

  spinnerStyle() {
    let style = {
      'display': this.loaded ? 'none' : 'block'
    }
    return style;
  }

  // getFiles(){
  //   for (let post in this.posts){
  //     let location = post.post_filename.split("files/posts")[0]
  //     let newFilename=post.post_filename.replace(location,"http://localhost:8080/viewgram/")
  //     post.post_filename = newFilename
  //   }
  // }
  

}
