// -- Chargement des Elements Angular / Ionic
import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// -- Chargement des Pages
import { HomePage } from '../pages/home/home';
import {ConnexionPage} from "../pages/connexion/connexion";

// -- Chargement des Providers
import {ConfigurationProvider} from "../providers/configuration/configuration";
import {CategoriesProvider} from "../providers/categories/categories";
import {Network} from "@ionic-native/network";
import {ProduitsPage} from "../pages/produits/produits";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  @ViewChild(Nav) nav: Nav;

  appConfiguration : any;
  appCategories : any;
  rootPage: any = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public configurationProvider:ConfigurationProvider, public categorieProvider:CategoriesProvider,
              public menuCtrl: MenuController, public toastCtrl: ToastController, public network: Network) {

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

    // console.log(page);

    if(page == 'home') {
      this.nav.setRoot(HomePage,{'configuration':this.appConfiguration});
    }

    if(page === 'connexion') {
      this.nav.push(ConnexionPage,{'configuration':this.appConfiguration});
      // let popover = this.popoverCtrl.create(ConnexionPage,{'configuration':this.appConfiguration});
      // popover.present();
    }

    if(page === 'produits') {
      this.nav.push(ProduitsPage, {'categorie': params, configuration: this.appConfiguration});
      // let popover = this.popoverCtrl.create(ConnexionPage,{'configuration':this.appConfiguration});
      // popover.present();
    }

  }
}
