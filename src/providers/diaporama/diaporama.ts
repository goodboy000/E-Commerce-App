import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DiaporamaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiaporamaProvider {

  constructor(public http: HttpClient) { }

  getDiaporama():Observable<any> {
    return this.http.get( 'https://reservations.spotevasion.com/api/diaporama' )
  }

}
