import { Component, Inject } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { HttpClient} from '@angular/common/http';

/* mapping */
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {
  svhost: string = 'http://localhost:8000/viewgram/api';

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

}