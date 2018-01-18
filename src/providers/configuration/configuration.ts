import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigurationProvider {

  constructor(public http: HttpClient) {
  }

  url:string    = 'https://reservations.spotevasion.com/api/configuration';
  body = {"token": "AYhnfo75dndDf097zkFf87554zfhz8fz"};
  headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

  getConfiguration():Observable<any> {
    return this.http.post( this.url, this.body,{headers:this.headers} )
  }

}
