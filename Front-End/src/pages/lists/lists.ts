import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  id:number
  json:{name:string,username:string,email:string,password:string,bio:string, id_user:number, followers: {},likes:number};
  likes:{};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.json=this.navParams.get('json');
      this.id=this.json.id_user;
    console.log("json list: "+JSON.stringify(this.json));
    this.likes= this.json.likes;
    console.log("likes"+JSON.stringify(this.likes))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

}
