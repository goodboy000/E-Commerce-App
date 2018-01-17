// -- Chargement des Elements Angular / Ionic
import { Component, ViewChild } from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// -- Chargement des Pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ConnexionPage} from "../pages/connexion/connexion";

// -- Chargement des Providers
import {ConfigurationProvider} from "../providers/configuration/configuration";
import {CategoriesProvider} from "../providers/categories/categories";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  appConfiguration : any;
  appCategories : any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public configurationProvider:ConfigurationProvider, public categorieProvider:CategoriesProvider,
              public menuCtrl: MenuController) {

    this.initializeApp();

    // -- Récupération de la configuration
    configurationProvider.getConfiguration().subscribe(
      configuration => {
        this.appConfiguration = configuration;
      }
    );

    // -- Récupération de la liste des catégories
    categorieProvider.getCategories().subscribe(
      categories => {
        this.appCategories = categories
      }
    );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();

    // console.log(page);

    if(page == 'home') {
      this.nav.setRoot(HomePage);
    }

    if(page === 'connexion') {
      this.nav.setRoot(ConnexionPage,{'configuration':this.appConfiguration});
    }

  }
}
