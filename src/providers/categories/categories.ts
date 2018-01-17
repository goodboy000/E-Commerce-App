import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {

  constructor(public http: HttpClient) { }

  getCategories():Observable<any> {
    return this.http.get( 'https://reservations.spotevasion.com/api/categories' )
  }

}
