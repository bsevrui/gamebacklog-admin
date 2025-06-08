import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user/user';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonLabel, IonAvatar, IonSearchbar, IonRefresher, IonRefresherContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, personRemove } from 'ionicons/icons';

@Component({
  selector: 'app-user-module',
  templateUrl: './user-module.page.html',
  styleUrls: ['./user-module.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, IonButtons, IonMenuButton, IonList, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonLabel, IonAvatar, IonSearchbar, IonRefresher, IonRefresherContent, IonIcon]
})
export class UserModulePage implements OnInit {
  /* Flag for current user */
  public currentUser?: User;
  /* Flag for the users' array */
  private users: User[] = [];
  /* Flag for search query */
  public searchQuery: string = "";
  /* Flag for filtered users */
  public filteredUsers: User[] = [];

  /**
   * Constructor
   * @param apiService API Service.
   * @param localizationService Localization Service.
   * @param storageService Storage Service.
   * @param router Router.
   * @param toastCtrl Toast Controller.
   */
  constructor(
    private apiService: ApiService,
    private localizationService: LocalizationService,
    private storageService: StorageService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    addIcons({ create, personRemove });
  }

  async ngOnInit() {
    this.currentUser = await this.storageService.getUserData();
    this.loadData();
  }

  doRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData() {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
      }
    );
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user => user.username.toLowerCase().includes(this.searchQuery.toLowerCase())));
  }

  goToUpdatePage(userId: number) {
    this.router.navigate(['/users/update', userId]);
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  delete(userId: number) {
    this.apiService.deleteUser(userId).subscribe({
      next: (res) => {
        this.localizationService.translate(['TOAST_USER_DELETED']).subscribe(async (values) => {
          this.router.navigate(['/users']).then(() => {
            window.location.reload();
          });
          await this.presentToast(values['TOAST_USER_DELETED']);
        });
      }
    });
  }
}