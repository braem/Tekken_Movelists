import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, MenuController, ModalController} from 'ionic-angular';
import {LegendPage} from '../legend/legend.ts';
//import {ScreenOrientation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/movelist/movelist.html'
})
export class MovelistPage {

  private game: string;
  private arts: Object[];
  private character: string;
  private displayArt: string[] = [];

  constructor(private navCtrl: NavController, private navParams: NavParams, menu: MenuController,
              private modalCtrl: ModalController, private loadingCtrl: LoadingController) {

    menu.enable(true);
    this.game = navParams.get('game');
    this.arts = navParams.get('character')["arts"];
    this.spaceToNBSP();
    this.character = navParams.get('character');
    for(var i=0; i<this.arts.length; i++) //hide all arts on page load
      this.displayArt.push('hide');
  }

  spaceToNBSP() {
    //change spaces to &nbsp; in order for html to display follow up moves properly
    for(var i=0; i<this.arts.length; i++) {
      var art = this.arts[i];
      for(var j=0; j<art["moves"].length; j++) {
        var move = art["moves"][j];
        for(var k=0; k<move.length; k++) {
          move[k] = move[k].split(' ').join('\u00a0'); //replace
        }
      }
    }
  }

  presentLoading(duration: number) {
    let loader = this.loadingCtrl.create({
      content: "Loading Characters...",
      duration: duration
    });
    loader.present();
  }

  presentLegend() {
    let modal =  this.modalCtrl.create(LegendPage);
    modal.present();
  }

  clickedArt(index: number) {
    if(this.displayArt[index] === 'show') this.displayArt[index] = 'hide';
    else                                  this.displayArt[index] = 'show';
  }

  shouldHideArt(index: number) { return this.displayArt[index] === 'hide'; }

  calcRowColor(num: number) {
    if(num%2 == 1)  return 'alternate';
    else            return 'normal';
  }

  getColWidth(num: number, i: number) : string {
    if(num === this.arts.length-1)
      switch(i) {
        case 0: return 'dOne';
        case 1: return 'dTwo';
        case 2: return 'dThree';
        case 3: return 'dFour';
        default: return '';
      }
    else
      switch(i) {
        case 0: return 'nOne';
        case 1: return 'nTwo';
        case 2: return 'nThree';
        case 3: return 'nFour';
        case 4: return 'nFive';
        case 5: return 'nSix';
        default: return '';
      }
  }

}


