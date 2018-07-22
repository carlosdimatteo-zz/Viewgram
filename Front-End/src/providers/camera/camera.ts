import { HttpServicesProvider } from './../http-services/http-services';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ActionSheetController } from 'ionic-angular';

@Injectable()
export class CameraProvider {
  image: string = '';
  // svhost:'http://172.20.10.4:8080/viewgram';
  svhost:'http://192.168.0.106:8080/viewgram';
  path:string=""
  updateForm
  profileData=<any>{}

  constructor(
    public httpService: HttpServicesProvider,
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

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      console.log("giant image string : "+this.image)
    }, (err) => {
      alert(JSON.stringify(err))
    });
  }

  uploadPic(form:any,isPost:boolean,url:any){

      const fileTransfer : FileTransferObject =this.transfer.create();
      let option:FileUploadOptions={
        fileKey:'file',
        fileName:this.generateName(form.username,isPost),
        chunkedMode:false,
        mimeType:"image/jpeg",
        headers:{},
        params:{data:form}
      }
      //like sending  a formData
      fileTransfer.upload(this.image,`http://192.168.0.106:8080/viewgram/api/uploadFile.php`,option).then((data)=>{
        console.log(this.svhost);
        let path = (JSON.parse(data.response)).path;
        this.path=path;
        form.path=this.path;
        this.httpService.fetch(form,'POST',url).subscribe((res)=>{
          console.log('response from http request with upload form'+JSON.stringify(res))
        },(err=>console.log('err'+JSON.stringify(err))));

      }).catch(err=>console.log('error in promise'+JSON.stringify(err)))
  }

    generateName(username:string,isPost:boolean){
        let randomString=[...Array(16)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
        return ((isPost) ? `${username}_post_${randomString}.jpg`:`${username}_avatar_${randomString}.jpg`)
    }



}
