import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CategoriesProvider Provider');
  }

  categories = [
    {nomcategorie: 'Sainte-Lucie'},
    {nomcategorie: 'Martinique'},
    {nomcategorie: 'Caraibe'},
    {nomcategorie: 'Evenements'}
  ];

  getCategories() {
    return this.categories;
  }

}
