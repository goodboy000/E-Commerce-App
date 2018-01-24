import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ConnexionPage} from "../pages/connexion/connexion";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationProvider } from '../providers/configuration/configuration';
import {HttpClientModule} from "@angular/common/http";
import { CategoriesProvider } from '../providers/categories/categories';
import { ProduitsProvider } from '../providers/produits/produits';
import { DiaporamaProvider } from '../providers/diaporama/diaporama';
import {IonicImageLoader} from "ionic-image-loader";
import {ProduitPage} from "../pages/produit/produit";
import {Network} from "@ionic-native/network";
import {ProduitsPage} from "../pages/produits/produits";
import { AuthenticationProvider } from '../providers/authentication/authentication';
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ConnexionPage,
    ProduitPage,
    ProduitsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageLoader.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ConnexionPage,
    ProduitPage,
    ProduitsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationProvider,
    CategoriesProvider,
    ProduitsProvider,
    DiaporamaProvider,
    Network,
    AuthenticationProvider
  ]
})
export class AppModule {}
