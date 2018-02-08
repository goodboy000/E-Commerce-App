import { Component } from '@angular/core';
import {
  Events, Haptic, IonicPage, LoadingController, NavController, NavParams, ToastController,
  ViewController
} from 'ionic-angular';
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {ProfilPage} from "../profil/profil"

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
  loading:boolean = false;
  user = {
    email     : "hugo@biyn.media",
    password  : "sommaire"
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authenticationProvider: AuthenticationProvider,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              public haptic:Haptic,
              public events:Events,
              public loadingCtrl: LoadingController) {
    this.appConfiguration = navParams.get('configuration');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
      this.viewCtrl.setBackButtonText('');
  }

  connexion() {

    this.loading = true;

      // let authStatus = this.authenticationProvider.connexion(this.user);
      // console.log(authStatus);

    this.authenticationProvider.grantAccess(this.user, isAutorize => {
      // console.log(isAutorize);
      this.loading = false;
      if(isAutorize.status) {

        // this.navCtrl.push(ProfilPage);
        // this.haptic.notification({ type: 'success' });

        // this.authenticationProvider.getTokenData(user => {

          let loading = this.loadingCtrl.create({
            content: `Bienvenue ${ isAutorize.prenom }...`
          });

          loading.present();

          setTimeout(() => {
            this.events.publish('user:isAuthenticated', isAutorize);
            this.navCtrl.setRoot(ProfilPage, {configuration: this.appConfiguration});
          }, 1000);

          setTimeout(() => {
            loading.dismiss();
          }, 2000);

        // });

        // this.authenticationProvider.checkTokenExpiration(isTokenExpired => {
        //   console.log('isTokenExpired');
        //   console.log(isTokenExpired);
        // });

        // this.authenticationProvider.getToken().then(
        //   token => {
        //     console.log('getTokenExpirationDate');
        //     let date = this.authenticationProvider.getTokenExpirationDate(token);
        //     console.log(date);
        //   }
        // )

        // this.authenticationProvider.removeAccess();

        // this.authenticationProvider.getToken().then(
        //   token => {
        //     console.log('getTokenExpirationDate after Expiration');
        //     console.log(token);
        //   }
        // )

      } else {

        this.user.password = "";

        this.haptic.notification({ type: 'error' });

        let toast = this.toastCtrl.create({
          message: isAutorize.response.msg,
          position: 'top',
          cssClass: 'toast-danger',
          duration: 3000
        });
        toast.present();

      }
    });

  }



}
