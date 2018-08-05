import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProfilePage } from '../user-profile/user-profile';
import { PostPage } from '../post/post';
import { HttpPostsProvider } from '../../providers/http-posts/http-posts';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  json:{key:string,ht:boolean,user:boolean}
  users=[]
  posts=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpPost:HttpPostsProvider) {
    this.json={key:"",ht:false,user:true};
    this.json.ht=false
  }

  goToProfile(id){
    console.log(id);
    this.navCtrl.push(UserProfilePage,{id:id});
  }

  onInput({target:{value}}){
    console.log(value)
    if(value==""){
      this.posts=[]
      this.users=[]
    }else{
    this.json.key=value
    this.httpPost.search(this.json).subscribe(res=>{
      if(res.data){
        console.log(res.data)
        if(this.json.ht){
          this.posts=res.data
          console.log("posts : "+JSON.stringify(this.posts))
        }else if(this.json.user){
        console.log(res)
        this.users=res.data
        console.log("users:"+JSON.stringify(this.users))
        }else{
          this.posts=res.data
          console.log("posts : "+JSON.stringify(this.posts))
        }
      }else{
        this.posts=[]
      this.users=[]

      }
      
    })
  }
  }
 
  goToPost(id){
    console.log(id);
    this.navCtrl.push(PostPage,{id:id});
  }

  toggleHt(){
    this.json.ht=true
    this.json.user=false
    console.log("search ht? :"+this.json.ht)
  }
  toggleUser(){
    this.json.user=true
    this.json.ht=false
    console.log("search user?: "+this.json.user)
  }
  toggleLocation(){
    this.json.user=false
    this.json.ht=false
    console.log("search posts by location")
  }


  ionViewDidLoad() {
    console.log('ionVieeeeewDidLoad SearchPage')
    this.json={key:"",ht:false,user:true};
  }

}