import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage'
import { HomePage } from '../home/home';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { LoadingController ,Loading} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [
    Camera,
    FileTransfer,
    FileTransferObject,
    CameraProvider,
    HttpServicesProvider,
    Geolocation

  ]
})
export class UploadPage {
  caption: string = '';
  ht: string = '';
  tagged: string = '';
  path: string = '';
  checkedLocation: boolean;
  lat: number = null;
  long: number = null;
  svhost:'http://192.168.0.105:8080/viewgram';
  resJson:{user_id:number};
  home = HomePage;
  user_id:number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private mediaHandler: CameraProvider,
    private storage:Storage,
    private loading: LoadingController,
    private geolocation: Geolocation
  ) {
    this.svhost= "http://192.168.0.105:8080/viewgram";
    this.storage.get("user_id").then((data)=>{
      this.user_id=data;
    console.log("id from storage:"+this.user_id);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
    this.caption = '';
    this.ht = '';
    this.tagged = '';
    this.path = '';
    this.checkedLocation = false;
    this.lat = null;
    this.long = null; 
  }

  choosePicture() {
    this.mediaHandler.choose();
  }

submitForm() {
  // this.storage.get("user_id").then((data)=>{
  //   this.user_id=data;
  // console.log("id from storage:"+this.user_id);
  // });

    const loader = this.showLoader();
    console.log("loading loader"); loader.present();
    let json = {
      userid: this.user_id,
      caption: this.caption,
      tagged: ((this.tagged).split(',')),
      ht: ((this.ht).split(',')),
    }
    if(this.checkedLocation) {
      this.getLocation()
        .then((pos: any) => {
          json['lat'] = pos.latitude;
          json['long'] = pos.longitude;
          // alert(this.checkedLocation);
          // alert(JSON.stringify(json));
          // json["user_id"]=this.user_id 
          console.log("next upload.php?: "+JSON.stringify(json))
              
          this.mediaHandler.upload(json, true, 'upload.php');
          console.log('Successful');
          loader.dismiss();
          loader.onDidDismiss(() => 
          this.navCtrl.setRoot(this.home));
          console.log('Perfect');
        })
    }
  }



  getLocation() {
    return new Promise((res, rej) => {
      this.geolocation.getCurrentPosition({timeout: 20000})
        .then((pos) => res(pos.coords))
        .catch((error) => rej(error));    
    });
  }

  showLoader() {
    const loading = this.loading.create({
      content: 'Uploading...',
      spinner: 'dots'
    });
    return loading;  
  }
    

}
