import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { UserProfilePage } from '../user-profile/user-profile';
import { PostPage } from '../post/post';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServicesProvider) {
    this.json={key:"",ht:false,user:true};
    this.json.ht=false
  }

  goToProfile(id){
    console.log(id);
    this.navCtrl.push(UserProfilePage,{id:id});
  }

  onInput(event){
    console.log(event.target.value)
    this.json.key=event.target.value
    this.httpService.fetch(this.json,"POST","search.php").subscribe(res=>{
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
    })
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