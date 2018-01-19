import {Component, OnInit} from '@angular/core';
import {MenuController, NavController, NavParams} from 'ionic-angular';
import {ProduitsProvider} from "../../providers/produits/produits";
import {ConfigurationProvider} from "../../providers/configuration/configuration";
import {DiaporamaProvider} from "../../providers/diaporama/diaporama";
import {ProduitPage} from "../produit/produit";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  produits:any;
  appConfiguration: any;
  diaporama: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public ProduitsProvider: ProduitsProvider,
              public navParams: NavParams, public configurationProvider:ConfigurationProvider, public diaporamaProvider: DiaporamaProvider) {
  }

  ngOnInit(): void {
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
    console.log(idproduit);
    this.menuCtrl.close();
    this.navCtrl.push(ProduitPage, {'idproduit': idproduit, configuration: this.appConfiguration});
  }

}
