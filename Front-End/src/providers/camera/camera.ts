import { HttpServicesProvider } from './../http-services/http-services';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {Transfer,TransferObject} from '@ionic-native/transfer'
import { ActionSheetController, Platform, ToastController, LoadingController ,Loading} from 'ionic-angular';
import {FilePath} from '@ionic-native/file-path'
import { cordovaWarn } from '../../../node_modules/@ionic-native/core';

declare var cordova:any;

@Injectable()
export class CameraProvider {
 
  image: string = '';
  svhost:'http://192.168.43.183:8080/viewgram';
  path:string=""
  updateForm;

  constructor(
    public httpService: HttpServicesProvider,
    private camera: Camera, 
    private actionSheet: ActionSheetController,
    private transfer: FileTransfer,
    private loading: LoadingController
    ) {
    console.log('Hello CameraProvider Provider');
      this.svhost= "http://192.168.43.183:8080/viewgram";
  }

  choose() {
    const op = this.actionSheet.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Take picture',
          handler: () => {
            this.cameraOp(1)
          }
        },{
          text: 'Select picture',
          handler: () => this.cameraOp(0)         
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    op.present();
  }

  upload(form: any, isPost: boolean, url: any) {
    
    console.log("this should have an id : "+JSON.stringify(form));
    const loader = this.showLoader();
    console.log("loading loader"); 
    //loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: this.generateName(form.userid, isPost),
       chunkedMode: false,
       mimeType: "image/jpeg",
       headers: {},
       params: {data: form}
    }
    console.log('next will upload');
    fileTransfer.upload(this.image, `${this.svhost}/api/uploadFile.php`, options)
     .then((data) => { 
       let path = (JSON.parse(data.response)).path;
       this.path = path;
       form.path = this.path;
       console.log('FORM'+JSON.stringify(form));
       console.log("next will call upload.php");
       this.httpService.fetch(form, 'POST', url)
        .subscribe(
          (res) => {
            console.log('res'+JSON.stringify(res));
            console.log("requested to upload.php: "+JSON.stringify(form));
          //alert('asdasdasdas'+JSON.stringify(res))
           // loader.dismiss();
          },
          (err) => {
            loader.dismiss();
            alert('Error fetching post'+JSON.stringify(err));
          });
    })
    .catch(err => {
      loader.dismiss();
      alert('Error'+JSON.stringify(err));
    })
  }

  cameraOp(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      // alert(this.avatarImage);
      // this.upload(this.avatarImage);
    }, (err) => {
      // Handle error
      alert(JSON.stringify(err))
    });
  }

  getBase64() {
    // alert(this.avatarImage)
    return this.image;
  }

  generateName(user_id: number, isPost: boolean) {
    let randomNum = Math.random() * (153462458942 - 1253) + 1732;
    console.log("this should be an id:"+user_id)
    return ((isPost) ? `${user_id}_post_${randomNum}.jpg` : `${user_id}_avatar_${randomNum}.jpg`);
  }  

  showLoader() {
    const loading = this.loading.create({
      content: 'Updating...',
      spinner: 'dots'
    });
    return loading;  
  }
}