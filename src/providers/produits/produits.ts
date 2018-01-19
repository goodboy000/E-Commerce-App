import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ProduitsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProduitsProvider {

  constructor(public http: HttpClient) { }

  getProduits():Observable<any> {
    return this.http.get( 'https://reservations.spotevasion.com/api/produits' )
  }

  getProduit(idproduit:Number):Observable<any> {
    return this.http.get( 'https://reservations.spotevasion.com/api/produit/' + idproduit )
  }
}
