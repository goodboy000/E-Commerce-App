import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {ConnexionPage} from "../connexion/connexion";

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  user:any;
  appConfiguration:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Auth:AuthenticationProvider,
              public viewCtrl: ViewController) {
    this.appConfiguration = navParams.get('configuration');
  }

  ionViewCanEnter() {
    return this.Auth.allowUserAccess();
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.Auth.getTokenData(user => {
      console.log(user);
      this.user = user;
    });
    console.log('ionViewDidLoad ProfilPage');
  }

}
