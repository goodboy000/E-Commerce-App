import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {AuthenticationProvider} from "../../providers/authentication/authentication";

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  user:any;
  loadingProfil: boolean = false;
  active: boolean = true;
  appConfiguration:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Auth:AuthenticationProvider,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public events: Events) {
    this.appConfiguration = navParams.get('configuration');
  }

  ionViewCanEnter() {
    return this.Auth.allowUserAccess();
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
    this.Auth.getTokenData(user => {
      this.user = user;
    });
    console.log('ionViewDidLoad ProfilPage');
  }

  /**
   * Sauvegarde les données du profil
   */
  saveUserProfil() {
    this.loadingProfil = true;
    this.Auth.saveUserData(this.user,response => {
      if(response.data) {
        this.loadingProfil = false;
        this.active = false;
        setTimeout(() => { this.active = true; }, 0);
        this.events.publish('user:isAuthenticated', true);
        let toast = this.toastCtrl.create({
          message: 'Profil enregistré !',
          position: 'top',
          cssClass: 'toast-success',
          duration: 2000
        });
        toast.present();
      }
    });
  }

  goToMessage() {
    this.navCtrl.push('MessagePage');
  }

}
