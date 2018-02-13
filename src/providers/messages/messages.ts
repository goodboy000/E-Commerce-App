import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthenticationProvider} from "../authentication/authentication";

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  constructor(public http: HttpClient, private Auth:AuthenticationProvider) { }

  getMessages(callback : (response) => void){
    this.Auth.getToken().then(token => {

      let headers = new HttpHeaders()
        // .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token);

      // const body = { "user": user };
      console.log("messageProvider entering");
      this.http.get( 'https://reservations.spotevasion.com/api/messages', {headers:headers} ).subscribe(
        messages => {
          console.log(messages);
          let m:any = messages;
          if(m.success) {
            callback({'data':m.data});
          }
        }
      );

    })

  }

}
