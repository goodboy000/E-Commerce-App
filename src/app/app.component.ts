// -- Chargement des Elements Angular / Ionic
import {Component, OnInit, ViewChild} from '@angular/core';
import {Events, MenuController, Nav, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// -- Chargement des Providers
import {ConfigurationProvider} from "../providers/configuration/configuration";
import {CategoriesProvider} from "../providers/categories/categories";
import {Network} from "@ionic-native/network";
import {AuthenticationProvider} from "../providers/authentication/authentication";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  @ViewChild(Nav) nav: Nav;

  appConfiguration : any;
  appCategories : any;
  rootPage: any = 'HomePage';
  isUserAuthenticated:boolean = false;
  user:any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public configurationProvider:ConfigurationProvider,
              public categorieProvider:CategoriesProvider,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              public network: Network,
              public Auth: AuthenticationProvider,
              public events: Events) {

    // -- Chargement de l'Application
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {

    console.clear();

    // -- Ecoute la connexion d'un utilisateur
    this.events.subscribe('user:isAuthenticated', isAutorize => {
      this.isUserAuthenticated = isAutorize;
      this.Auth.getTokenData(user => {
        this.user = user;
      });
    });

    // -- Vérification de la connexion de l'utilisateur
    /**
     * Si l'utilisateur est bien authentifié, on met juste a jour ses informations de profil
     * au cas ou elle aurait changé depuis la dernière connexion.
     */
    this.Auth.isUserAuthenticated(isAuth => {
      this.isUserAuthenticated = isAuth;
      if(isAuth) {

        this.Auth.refreshUserData()
        this.Auth.getTokenData(user => {
          this.user = user;
        });

      }
    });

    // -- Récupération de la configuration
    this.configurationProvider.getConfiguration().subscribe(
      configuration => {
        this.appConfiguration = configuration;
      }
    );

    // -- Récupération de la liste des catégories
    this.categorieProvider.getCategories().subscribe(
      categories => {
        this.appCategories = categories
      }
    );

  }

  ionViewLoaded() { }

  ionViewDidEnter() {
    // https://blog.paulhalliday.io/2017/06/23/ionic-3-network-detection/
    // TODO Ne fonctionne pas...
    this.network.onDisconnect().subscribe(() => {
      this.toastCtrl.create({
        message: `Vous devez être connecté à internet pour continuer.`,
        duration: 5000
      }).present();
    });
  }

  openPage(page, params?) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();

    switch (page) {
      case "home": {
        this.nav.setRoot('HomePage',{'configuration':this.appConfiguration});
        break;
      }

      case "connexion": {
        this.nav.push('ConnexionPage',{'configuration':this.appConfiguration});
        break;
      }

      case "messagerie": {
        this.nav.push('MessagePage');
        break;
      }

      case "profil": {
        this.nav.push('ProfilPage',{'configuration':this.appConfiguration});
        break;
      }

      case "deconnexion": {
        this.isUserAuthenticated = false;
        this.user = false;
        this.Auth.removeAccess();

        this.toastCtrl.create({
          message: `Deconnexion...`,
          duration: 3000,
          position:'top'
        }).present();

        this.nav.setRoot('HomePage');
        break;
      }

      case "produits": {
        this.nav.push('ProduitsPage', {'categorie': params, configuration: this.appConfiguration});
        break;
      }

      default: {
        this.nav.setRoot('HomePage');
        break;
      }
    }

  }

  // --------------------------- DEBUG PART

  getToken() {
    this.Auth.getToken().then(
      token => {
        if(!token) return "Aucun Token";
        console.log('getToken');
        console.log(token);
      }
    )
  }

  getTokenExpirationDate() {
    this.Auth.getToken().then(
      token => {
        if(!token) return false;

        console.log('getTokenExpirationDate');
        let date = this.Auth.getTokenExpirationDate(token);
        console.log(date);

      }
    )
  }

  DebugIsUserAuthenticated() {
    this.Auth.isUserAuthenticated(isAuth => {
      console.log('isUserAuth = ');
      console.log(isAuth)
    });
  }

  getAuthStatus() {
    console.log(this.isUserAuthenticated);
  }

  clearConsole() { console.clear(); }

  isTokenExpired() {
    this.Auth.checkTokenExpiration(isTokenExpired => {
      console.log('isTokenExpired');
      console.log(isTokenExpired);
    });
  }

  AllowUserAccess() {
    console.log('allowUserAccess');
    console.log(this.Auth.allowUserAccess());
  }

  getTokenData() {
    console.log('getTokenData');
    this.Auth.getTokenData(user => {
      console.log(user);
    })
  }

}
