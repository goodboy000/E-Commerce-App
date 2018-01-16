import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  ngOnInit(): void {
    this.menuCtrl.open();
  }

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

  }

}
