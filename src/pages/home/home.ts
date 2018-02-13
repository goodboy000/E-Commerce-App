import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {ConfigurationProvider} from "../../providers/configuration/configuration";
import {DiaporamaProvider} from "../../providers/diaporama/diaporama";
import {ImageLoaderConfig} from "ionic-image-loader";
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {ProduitsProvider} from "../../providers/produits/produits";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  produits:any;
  appConfiguration: any;
  diaporama: any;
  isAuthenticated:boolean = false;

  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public ProduitsProvider: ProduitsProvider,
              public navParams: NavParams,
              public configurationProvider:ConfigurationProvider,
              public diaporamaProvider: DiaporamaProvider,
              public imageLoaderConfig: ImageLoaderConfig,
              public Auth: AuthenticationProvider) {

    this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
  }

  ngOnInit(): void {

    this.Auth.isUserAuthenticated(isAuth => {
      this.isAuthenticated = isAuth;
    })

    // this.menuCtrl.open();
    this.ProduitsProvider.getProduits().subscribe(
      produits => {
        this.produits = produits;
      }
    );

    // -- Récupération de la configuration
    this.configurationProvider.getConfiguration().subscribe(
      configuration => {
        this.appConfiguration = configuration;
      }
    );

    // -- Récupération des Slides du Diaporama
    this.diaporamaProvider.getDiaporama().subscribe(
      slides => {
        this.diaporama = slides;
      }
    )

  }

  // -- Raffraichir la Vue
  doRefresh(refresher) {
    this.ProduitsProvider.getProduits().subscribe(
      produits => {
        this.produits = produits;
        refresher.complete();
      }
    );
  }

  // -- Afficher un Produit
  getProduit(idproduit) {
    this.menuCtrl.close();
    this.navCtrl.push('ProduitPage', {'idproduit': idproduit, configuration: this.appConfiguration});
  }

  goToProfil() {
    this.navCtrl.push('ProfilPage', {configuration: this.appConfiguration});
  }

  goToLogin() {
    this.navCtrl.push('ConnexionPage', {configuration: this.appConfiguration});
  }

  goToMessage() {
    this.navCtrl.push('MessagePage');
  }

}
