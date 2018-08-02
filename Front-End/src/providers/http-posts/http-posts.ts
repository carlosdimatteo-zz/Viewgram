import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpPostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpPostsProvider {
      //   svhost: string = 'http://172.20.10.4:8080/viewgram/api';
      svhost: string = 'http://192.168.1.102:8080/viewgram/api';
    
  constructor(public http: HttpClient) {
    console.log('Hello HttpPostsProvider Provider');
  }

  search(json){
    return this.http.post(`${this.svhost}/search.php`,json).map((res:any)=>res);
  }

  getPost(idUser,idPost){
    return this.http.get(`${this.svhost}/post.php?user_id=${idUser}&post_id=${idPost}`).map((res: any) => res);
  }

  home(id){
    return this.http.get(`${this.svhost}/home.php?id=${id}`).map((res: any) => res);
  }

}
