import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigurationProvider } from '../providers/configuration/configuration';
import {HttpClientModule} from "@angular/common/http";
import { CategoriesProvider } from '../providers/categories/categories';
import { ProduitsProvider } from '../providers/produits/produits';
import { DiaporamaProvider } from '../providers/diaporama/diaporama';
import {IonicImageLoader} from "ionic-image-loader";
import {Network} from "@ionic-native/network";
import { AuthenticationProvider } from '../providers/authentication/authentication';
import {IonicStorageModule} from "@ionic/storage";
import { Pro } from '@ionic/pro';

// These are the imports required for the code below,
// feel free to merge into existing imports.
import { Injectable, Injector } from '@angular/core';
import { MessagesProvider } from '../providers/messages/messages';

const IonicPro = Pro.init('f801a5d0', {
  appVersion: "0.0.1"
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageLoader.forRoot(),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    ConfigurationProvider,
    CategoriesProvider,
    ProduitsProvider,
    DiaporamaProvider,
    Network,
    AuthenticationProvider,
    MessagesProvider
  ]
})
export class AppModule {}
