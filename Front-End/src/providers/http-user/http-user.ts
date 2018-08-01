import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpUserProvider {
    //   svhost: string = 'http://172.20.10.4:8080/viewgram/api';
    svhost: string = 'http://192.168.43.183:8080/viewgram/api';
    
  constructor(public http: HttpClient) {
    console.log('Hello HttpUserProvider Provider');
  }

    profileData(id){
      return this.http.get(`${this.svhost}/profile.php?user_id=${id}`).map((res: any) => res);
    }

    userProfileData(id,navId){
      return this.http.get(`${this.svhost}/UserProfile.php?user_id=${id}&nav_user=${navId}`)
      .map((res: any) => res);
    }

    editProfile(data){
      return this.http.post(`${this.svhost}/updateUser.php`,data)
      .map((res: any) => res);
    }

    getLocation(lat,lon){
      return this.http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=false?key=AIzaSyCuP2So9c8btOOcewqGchIC2iFE2JYxBDs`).map((res:any)=>res);
  }

    notifications(id){
      return this.http.get(`${this.svhost}/mentions.php?userid=${id}`).map((res: any) => res);
    }
}
