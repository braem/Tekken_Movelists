import {Component} from '@angular/core';
import {NavController, MenuController, LoadingController} from 'ionic-angular';
import {CharSelectPage} from "../char-select/char-select.ts";
//import {ScreenOrientation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/game-select/game-select.html'
})
export class GameSelectPage {

  public games: string[];

  constructor(public nav: NavController, private loadingCtrl: LoadingController, public menu: MenuController) {
    menu.enable(true);
    this.games = ['tekken6', 'tekken5dr', 'tekken5', 'tekken4', 'tekkentag', 'tekken3'];
  }

  advance(game: string) {
    this.nav.push(CharSelectPage, {
      game: game
    });
  }
}


