import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpInteractionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpInteractionProvider {
      //   svhost: string = 'http://172.20.10.4:8080/viewgram/api';
    svhost: string = 'http://10.240.130.170:8080/viewgram/api';
    
  constructor(public http: HttpClient) {
    console.log('Hello HttpInteractionProvider Provider');
  }

    follow(id,followerId){
      return this.http.get(`${this.svhost}/follow.php?followed_id=${id}&follower_id=${followerId}`).map((res: any) => res);
    }

    unfollow(id,followerId){
      return this.http.get(`${this.svhost}/unfollow.php?followed_id=${id}&follower_id=${followerId}`).map((res: any) => res);
    }

    report(idUser,idPost){
      return this.http.get(`${this.svhost}/report.php?user_id=${idUser}&post_id=${idPost}`).map((res: any) => res);

    }

    comment(idUser,idPost,comment){
      return this.http.post(`${this.svhost}/comment.php?user_id=${idUser}&post_id=${idPost}`,comment)
                  .map((res: any) => res);
    }

    deleteComment(comment){
      return this.http.post(`${this.svhost}/deleteComment.php`,comment).map((res:any)=>res);
    }

    like(idUser,idPost){
      return this.http.get(`${this.svhost}/like.php?user_id=${idUser}&post_id=${idPost}`)
                  .map((res: any) => res);

    }

    dislike(idUser,idPost){
      return this.http.get(`${this.svhost}/dislike.php?user_id=${idUser}&post_id=${idPost}`)
                  .map((res: any) => res);

    }


    

}
