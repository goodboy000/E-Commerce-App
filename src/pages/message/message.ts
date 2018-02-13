import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MessagesProvider} from "../../providers/messages/messages";

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  messages:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private messageProvider: MessagesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.messageProvider.getMessages(response => {
      console.log(response);
      this.messages = response;
    })
  }

}
