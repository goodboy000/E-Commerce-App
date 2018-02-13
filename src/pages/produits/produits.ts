import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ProduitsProvider} from "../../providers/produits/produits";

/**
 * Generated class for the ProduitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produits',
  templateUrl: 'produits.html',
})
export class ProduitsPage implements OnInit{

  produits:any;
  categorie:any;
  appConfiguration:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public produitsProvider:ProduitsProvider, public viewCtrl:ViewController,
              public menuCtrl:MenuController) {

    this.categorie = navParams.get('categorie');
    this.appConfiguration = navParams.get('configuration');
  }

  ngOnInit(): void {
   this.produitsProvider.getProduitsFromCategorie(this.categorie.id).subscribe(
     produits => {
       this.produits = produits;
     }
   )
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('');
  }

  // -- Afficher un Produit
  getProduit(idproduit) {
    this.menuCtrl.close();
    this.navCtrl.push('ProduitPage', {'idproduit': idproduit, configuration: this.appConfiguration});
  }

}
