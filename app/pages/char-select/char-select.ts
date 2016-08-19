import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, MenuController} from 'ionic-angular';
import {MovelistPage} from '../movelist/movelist.ts';

@Component({
  templateUrl: 'build/pages/char-select/char-select.html'
})
export class CharSelectPage {

  private characters: string[];
  private game: string;
  private jsonInfo: any;
  private character: string;
  private gender: string = 'All';
  private showSearchBar: string = 'hide';

  constructor(public navCtrl: NavController, private navParams: NavParams,
              private loadingCtrl: LoadingController, public menu: MenuController) {
    this.menu.enable(true);
    //selected game
    this.game = navParams.get('game');

    //acquire JSON data (tekken game's movelists)
    var request = new XMLHttpRequest();
    var jsonInfo = [];
    request.open("GET", "assets/JSONs/"+this.game+".JSON", false);
    request.send(null);
    jsonInfo.push(JSON.parse(request.responseText));
    console.log(jsonInfo);
    this.jsonInfo = jsonInfo;

    this.initializeItems();
  }

  presentLoading(character: string, duration: number) {
    let loader = this.loadingCtrl.create({
      content: "Loading "+character+"'s Move List...",
      duration: duration
    });
    loader.present();
  }

  toggleSearchBar() {
    if(this.showSearchBar === 'show') {
      this.showSearchBar = 'hide';
    }
    else {
      this.showSearchBar = 'show';
    }
  }

  hideSearchBar() {
    if(this.showSearchBar === 'hide') return true;
    else return false;
  }

  hideSeg(a: string,b: string) {
    if(a === 'All') return false;
    if(a === b)
      return false;
    else return true;
  }

  initializeItems() {
    //extract characters
    var characters = [];
    for(var i=0; i<this.jsonInfo[0]["movelists"].length; i++) {
      characters.push(this.jsonInfo[0]["movelists"][i]);
    }
    this.characters = characters;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.characters = this.characters.filter( function(character) {
        return (character["name"].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  advance(character: Object) {
    console.log(this.game + character);
    this.navCtrl.push(MovelistPage, {
      game: this.game,
      character: character
    });
  }

  openMenu() {

  }
}
