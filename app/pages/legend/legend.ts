import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {App, MenuController, ViewController, Platform} from 'ionic-angular';

/*
  Generated class for the LegendPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/legend/legend.html',
})
export class LegendPage {

  private displayTable: string[] = ['hide','hide','hide','hide','hide','hide','hide'];

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController,
              menu: MenuController) {

  }

  clickedTable(i: number) {
    if(this.displayTable[i] === 'show') {
      this.displayTable[i] = 'hide';
    }
    else {
      this.displayTable[i] = 'show';
    }
  }

  shouldHideTable(i: number) {
    if(this.displayTable[i] === 'hide') return true;
    else return false;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
