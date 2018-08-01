import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';

/**
 * Generated class for the FollowersListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followers-list',
  templateUrl: 'followers-list.html',
})
export class FollowersListPage {
  id:number
  json:{name:string,username:string,email:string,password:string,bio:string, id_user:number, followers: {}};
  followers:{};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.json=this.navParams.get('json');
      this.id=this.json.id_user;
    console.log("json list: "+JSON.stringify(this.json));
    this.followers= this.json.followers;
    console.log("followers"+JSON.stringify(this.followers))
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersListPage');
  }

  goToProfile(id){
    console.log(id);
    this.navCtrl.push(UserProfilePage,{id:id});
  }

}
