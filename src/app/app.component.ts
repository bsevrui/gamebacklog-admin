
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from './core/services/localization.service';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { MenuPage } from './core/interfaces/menu-page';
import { addIcons } from 'ionicons';
import { gameController, gameControllerSharp, pricetag, peopleSharp, personSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, CommonModule, TranslateModule, IonSplitPane, IonMenu, IonContent, IonList, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  /**
   * Constructor
   * @param platform              Platform.
   * @param localizationService   Localization Service.
   */
  constructor(
    private platform: Platform,
    private localizationService: LocalizationService
  ) {
    addIcons({ gameController, gameControllerSharp, pricetag, peopleSharp, personSharp });
    this.initializeApp();
  }

  menuPages: MenuPage[] = [
    { title: 'PAGE_GAMES', icon: 'game-controller', path: '/games' },
    { title: 'PAGE_GENRES', icon: 'pricetag', path: '/genres' },
    { title: 'PAGE_PLATFORMS', icon: 'game-controller-sharp', path: '/platforms' },
    { title: 'PAGE_USERS', icon: 'people-sharp', path: '/users' },
    { title: 'PAGE_PROFILE', icon: 'person-sharp', path: '/profile' }
]

  initializeApp() {
    this.localizationService.initializeLocalization();
    this.platform.ready().then(async () => {
      await SplashScreen.hide();
    });
  }
}