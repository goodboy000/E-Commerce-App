import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProduitsProvider} from "../../providers/produits/produits";

/**
 * Generated class for the ProduitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produit',
  templateUrl: 'produit.html',
})
export class ProduitPage implements OnInit{

  idproduit:number;
  produit:any;
  appConfiguration:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produitsProvider: ProduitsProvider) {
    this.idproduit        = navParams.get('idproduit');
    this.appConfiguration = navParams.get('configuration');
  }

  ngOnInit(): void {
    this.produitsProvider.getProduit(this.idproduit).subscribe(
      produit => {
        this.produit = produit[0];
        console.log(this.produit.NOM_PRODUIT);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduitPage');
  }

}
