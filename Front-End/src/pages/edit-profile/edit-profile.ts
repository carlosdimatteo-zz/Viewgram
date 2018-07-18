import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  editForm: FormGroup;
  id:number
  json:{name:string,username:string,email:string,password:string,bio:string, id_user:number}
  resJson:{user_id:string,status:number}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private httpService:HttpServicesProvider,
    public alertCtrl : AlertController) {
      this.editForm = this.formBuilder.group({
        name:['', Validators.required],
        email:['', Validators.required],
        username:['',Validators.required],
        biography:['',Validators.required]
        // password: ['',Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.json=this.navParams.get('json');
    this.id=this.json.id_user
    console.log("json del usuario: "+JSON.stringify(this.json));
  }

  editUser(){
    
    this.json=this.editForm.value
    this.json.id_user=this.id
    console.log("json to send to server"+JSON.stringify(this.json))

    this.httpService.fetch(this.json,"POST","updateUser.php")
    .subscribe((res) => {
      console.log(res);
      this.resJson=res;

         if(this.resJson.status=200){
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
      
      console.log(this.resJson);
    });

  }


}
