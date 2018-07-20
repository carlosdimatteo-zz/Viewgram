import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';


@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private option: CameraProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  choosePhoto() {
    this.option.newPhoto();
  }
  uploadPic(){
    
  }

}
