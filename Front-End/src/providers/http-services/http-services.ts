import { Component, Inject } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { HttpClient} from '@angular/common/http';

/* mapping */
import 'rxjs/add/operator/map';

@Injectable()
export class HttpServicesProvider {
//   svhost: string = 'http://172.20.10.4:8080/viewgram/api';
    svhost: string = 'http://10.240.130.170:8080/viewgram/api';
    
  constructor(private http: HttpClient) {
  }

  test(){
      console.log(this.svhost);
      return this.http.post(this.svhost + '/test.php', null)
          .map((res: any) => res);
  }

  fetch(data, method, url){
      switch(method){
          case 'GET': {
              return this.http.get(`${this.svhost}/${url}`)
                  .map((res: any) => res);
          }
          case 'POST': {
              return this.http.post(`${this.svhost}/${url}`, data)
                  .map((res: any) => res);
          }
          case 'PUT': {
              return this.http.put(`${this.svhost}/${url}`, data)
                  .map((res: any) => res);
          }
          case 'DELETE': {
              return this.http.delete(`${this.svhost}/${url}`)
                  .map((res: any) => res);
          }
      }
  }
  userDashboard = (url) => {
    return this.http.get(`${this.svhost}/${url}`)
      .map((res: any) => res);
  }

  getLocation(url){
      return this.http.get(url).map((res:any)=>res);
  }

}