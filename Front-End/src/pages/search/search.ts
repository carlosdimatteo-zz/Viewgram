import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  search:string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onInput(event){
    console.log(event.target.value)
    this.search=event.target.value
  }

  ionViewDidLoad() {
    console.log('ionVieeeeewDidLoad SearchPage');
  }

}
