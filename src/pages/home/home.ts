import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, MenuController, NavController, NavParams} from 'ionic-angular';
import {ProduitsProvider} from "../../providers/produits/produits";
import {ConfigurationProvider} from "../../providers/configuration/configuration";
import {DiaporamaProvider} from "../../providers/diaporama/diaporama";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild(Content) content: Content;

  appTitle:string = 'Spot Evasion !';
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

    // --
    // this.content.ionScroll.subscribe(
    //   (ev) => {
    //     console.log(ev)
    //     if(Math.round(ev.scrollTop) > 360) {
    //
    //       this.appTitle = 'Découvrez nos produits';
    //     } else {
    //       this.appTitle = 'Spot Evasion !';
    //     }
    //   }
    // )

  }

  // onScroll(ev) {
  //
  //   console.log(ev);
  //   this.appTitle = 'Découvrez nos produits';
  //
  //   if(Math.round(ev.scrollTop) > 360) {
  //     this.appTitle = 'Découvrez nos produits';
  //     console.log('is SUP')
  //   } else {
  //     this.appTitle = 'Spot Evasion !';
  //   }
  //
  // }

  doRefresh(refresher) {

    this.ProduitsProvider.getProduits().subscribe(
      produits => {
        this.produits = produits;
        refresher.complete();
      }
    );
  }

}
