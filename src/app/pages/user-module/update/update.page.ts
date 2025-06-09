import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user/user';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonButton, IonIcon, IonButtons, IonBackButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveSharp, close, mail, at } from 'ionicons/icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, TranslateModule, FormsModule, RouterLink, IonSelect, IonSelectOption, IonButton, IonList, IonItem, IonIcon, IonBackButton, IonButtons, IonLabel, IonInput]
})
export class UpdatePage implements OnInit {
  private userId?: number;
  public user?: User;
  public role?: 'ADMIN' | 'USER';
  public birthdate?: Date;
  public firstName?: string;
  public lastName?: string;
  public profilePicture?: string;

  /**
   * 
   * @param apiService API Service
   * @param localizationService Localization Service
   * @param activatedRoute Activated Route
   * @param router Router
   * @param toastCtrl Toast Controller
   */
  constructor(
    private apiService: ApiService,
    private localizationService: LocalizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    addIcons({ saveSharp, close, mail, at });
  }

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('userId'));
    this.loadData();
  }

  loadData() {
    if (this.userId) {
      this.apiService.getUser(this.userId).subscribe(
        (data) => {
          this.user = data;
        }
      );
    }
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

  update() {
    if (this.userId) {
      this.apiService.updateUser(this.userId, {
        role: this.role,
        birthdate: this.birthdate,
        firstName: this.firstName,
        lastName: this.lastName,
        profilePicture: this.profilePicture
      }).subscribe({
        next: (res) => {
          this.localizationService.translate(['TOAST_USER_UPDATED']).subscribe(async (values) => {
            this.router.navigate(['/users']).then(() => {
              window.location.reload();
            });
            await this.presentToast(values['TOAST_USER_UPDATED']);
          });
        },
        error: (err) => console.error('error: ', err)
      });
    }
  }
}