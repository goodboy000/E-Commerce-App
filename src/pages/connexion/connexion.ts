import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthenticationProvider} from "../../providers/authentication/authentication";

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  appConfiguration: any;
  error:boolean = false;
  user = {
    email     : "hugo@biyn.media",
    password  : "sommaires"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authenticationProvider: AuthenticationProvider) {
    this.appConfiguration = navParams.get('configuration');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  connexion() {

      // let authStatus = this.authenticationProvider.connexion(this.user);
      // console.log(authStatus);

    this.authenticationProvider.grantAccess(this.user, isAutorize => {
      console.log(isAutorize);
      if(isAutorize.status) {

        this.authenticationProvider.getTokenData(user => {
          console.log('getTokenData');
          console.log(user);
        });

        this.authenticationProvider.checkTokenExpiration(isTokenExpired => {
          console.log('isTokenExpired');
          console.log(isTokenExpired);
        });

        this.authenticationProvider.getToken().then(
          token => {
            console.log('getTokenExpirationDate');
            let date = this.authenticationProvider.getTokenExpirationDate(token);
            console.log(date);
          }
        )

        this.authenticationProvider.removeAccess();

        this.authenticationProvider.getToken().then(
          token => {
            console.log('getTokenExpirationDate after Expiration');
            console.log(token);
          }
        )

      } else {

      }
    });

  }



}
