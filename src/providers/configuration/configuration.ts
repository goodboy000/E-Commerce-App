import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigurationProvider {

  constructor(public http: HttpClient) {
  }

  configuration = {
    logo_site : "https://reservations.spotevasion.com/img/logo-spotevasion.png",
    nom_site  : "Spot Evasion",
  }

  getConfig() {
    return this.configuration;
  }

}
