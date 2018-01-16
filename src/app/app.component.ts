import { Component, ViewChild } from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ConfigurationProvider} from "../providers/configuration/configuration";
import {CategoriesProvider} from "../providers/categories/categories";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  appConfig : any;
  appCategories : any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public configurationProvider:ConfigurationProvider, public categorieProvider:CategoriesProvider,
              public menuCtrl: MenuController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Connexion', component: ListPage },
      { title: 'Inscription', component: ListPage },
      { title: 'Contact', component: ListPage }
    ];

    // -- Récupération de la configuration
    this.appConfig = configurationProvider.getConfig();

    // -- Récupération de la liste des catégories
    this.appCategories = categorieProvider.getCategories();
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
    this.nav.setRoot(ListPage);
  }
}
