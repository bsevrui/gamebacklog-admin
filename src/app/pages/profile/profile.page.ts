import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton, IonList, IonItem, IonAvatar, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user/user';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { calendar, gift, mail, idCard, key } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TranslateModule, IonButtons, IonMenuButton, IonButton, IonList, IonItem, IonAvatar, CommonModule, IonLabel, IonIcon],
})
export class ProfilePage implements OnInit {
  public currentUser?: User;

  /**
   * Constructor
   * @param storageService Storage Service.
   * @param router Router.
   */
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {
    addIcons({ mail, gift, calendar, idCard, key });
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.storageService.getUserData();
  }

  async logOut() {
    await this.storageService.clearUserData();
    this.router.navigate(['/auth/login']);
  }
}