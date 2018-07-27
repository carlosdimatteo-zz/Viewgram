import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder , FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ProfilePage } from '../profile/profile';
import { CameraProvider } from '../../providers/camera/camera';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  editForm: FormGroup;
  id:number
  json:{name:string,username:string,email:string,password:string,bio:string, id_user:number}
  resJson:{id_user:number,status:number}
  avatarImage: string = '';
  updateForm;
  svhost: string = '';
  path : string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private httpService:HttpServicesProvider,
    public alertCtrl : AlertController,
    private mediaHandler: CameraProvider) {
      // this.updateForm = this.formBuilder.group({
      //   name:['', Validators.required],
      //   email:['', Validators.required],
      //   username:['',Validators.required],
      //   biography:['',Validators.required]
      //   // password: ['',Validators.required]
      // });

      this.updateForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        biography: new FormControl('', [Validators.required])
      }); 
      this.json=this.navParams.get('json');
      this.id=this.json.id_user;
    console.log("json del usuario: "+JSON.stringify(this.json));
    this.svhost = "http://192.168.56.1:8080//viewgram//files//";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    console.log('para ver el id del usuario'+JSON.stringify(this.json));
    console.log('IDDDDDD!!!!!'+this.id);
    
  }

  editUser(){
    
    this.updateForm.value['userid'] = this.json['id_user'];
    this.json.id_user=this.id;
    console.log("id del jsonnnn"+JSON.stringify(this.updateForm.value['id_user']));
    console.log("json to send to server"+JSON.stringify(this.json));


    if((this.mediaHandler.getBase64()).length ===0){
      this.updateForm.value['haveAvatar'] = false;
    
    this.httpService.fetch(this.updateForm.value,"POST","updateUser.php")
    .subscribe((res) => {
      console.log(res);
      this.resJson=res;

         if(this.resJson.status==200){
          let alert = this.alertCtrl.create({
            title:"Succesfully updated user info",
            buttons:[{text:"OK",handler:()=>{
            this.navCtrl.pop()}}]
          });
          alert.present();
         }else{
           let alert = this.alertCtrl.create({
             title:"Sign Up unsuccesfull",
             subTitle:"Check your credentials",
             buttons:["OK"]
           });
           alert.present();
         }
      
      console.log(JSON.stringify(this.resJson));
    });
  }else{
    this.updateForm.value['haveAvatar'] = true;
    this.mediaHandler.upload(this.updateForm.value,false,'updateUser.php');
    console.log('json a enviar a la funcion upload'+JSON.stringify(this.updateForm.value));
  }

  }

  changePhoto(){
    this.mediaHandler.choose();
  }


}
