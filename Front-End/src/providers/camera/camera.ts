import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ActionSheetController } from 'ionic-angular';

@Injectable()
export class CameraProvider {

  constructor(
    public http: HttpClient,
    private camera: Camera, 
    private actionSheet: ActionSheetController, 
    private transfer: FileTransfer,
    ) {
    console.log('Hello CameraProvider Provider');

  }


  newPhoto() {
    const op = this.actionSheet.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Take picture',
          handler: () => {
            this.cameraOption(1)
          }
        },{
          text: 'Select picture',
          handler: () => this.cameraOption(0)         
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    op.present();
  }


  cameraOption(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType
    }

  }

}
