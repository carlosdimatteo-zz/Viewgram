import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpAuthProvider {
  //   svhost: string = 'http://172.20.10.4:8080/viewgram/api';
  svhost: string = 'http://192.168.56.1:8080/viewgram/api';

  constructor(public http: HttpClient) {
    console.log('Hello HttpAuthProvider Provider');
  }

  login(data){
   return this.http.post(`${this.svhost}/login.php`,data).map((res:any)=>res)
  }

  signup(data){
    return this.http.post(`${this.svhost}/register.php`,data).map((res:any)=>res)
  }

}
