import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.appConfiguration = navParams.get('configuration');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

}
