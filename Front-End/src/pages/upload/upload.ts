import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage'
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    CameraProvider
  ]
})
export class UploadPage {
  tagged: string = '';
  path: string = '';
  caption: string = '';
  ht:string=""
  resJson:{user_id:number}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private option: CameraProvider,
    private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  chooseNewPhoto() {
    this.option.newPhoto();
  }
  
  uploadPic(){
    this.storage.get("user_id").then(id=>{
      let json = {
        userid: id,
        username:id,
        caption: this.caption,
        tagged: ((this.tagged).split(',')),
        ht:((this.ht).split(','))
      }
      this.option.uploadPic(json, true, 'upload.php');
      this.navCtrl.setRoot(HomePage)
    })
    }
    

}
