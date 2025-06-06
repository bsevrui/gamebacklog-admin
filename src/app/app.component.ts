
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LocalizationService } from './core/services/localization.service';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private localizationService: LocalizationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.localizationService.initializeLocalization();
    this.platform.ready().then(async () => {
      await SplashScreen.hide();
    });
  }
}