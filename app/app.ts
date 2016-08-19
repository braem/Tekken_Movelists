import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {GameSelectPage} from './pages/game-select/game-select';
import {ContactPage} from './pages/contact/contact';
//import {ScreenOrientation} from 'ionic-native';

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {

  @ViewChild(Nav) nav:Nav;
  browsePages:Array<{title:string, component:any}>;
  private rootPage: any = GameSelectPage;

  constructor(private platform: Platform, private menu: MenuController) {
    Splashscreen.show();
    this.menu.enable(true);
    this.browsePages = [
      {title: 'Game Select', component: GameSelectPage},
      {title: 'Contact', component: ContactPage}
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    Splashscreen.hide();
    /*
    window.addEventListener("orientationchange", function(){
      console.log(ScreenOrientation.orientation["type"]); // e.g. portrait
      MyApp.screenorientation = ScreenOrientation.orientation["type"];
    });
    */
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(page.title === 'Game Select') { //no back button
      this.nav.setRoot(page.component);
    }
    else {  //back button
      this.nav.push(page.component);
    }
  }
}

ionicBootstrap(MyApp);
