import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Platform } from 'src/app/core/interfaces/platform/platform';
import { UpdatePlatform } from 'src/app/core/interfaces/platform/update-platform';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveSharp, close } from 'ionicons/icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, RouterLink, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonTextarea, IonButton, IonIcon]
})
export class UpdatePage implements OnInit {
  private platformId?: number;
  public platform?: Platform;
  public name?: string;
  public releaseDate?: Date;
  public detail?: string;
  public picture?: string;

  /**
   * Constructor
   * @param activatedRoute Activated Route.
   * @param apiService API Service.
   * @param localizationService Localization Service.
   * @param toastCtrl Toast Controller.
   * @param router Router.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private localizationService: LocalizationService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    addIcons({ saveSharp, close });
  }

  ngOnInit() {
    this.platformId = Number(this.activatedRoute.snapshot.paramMap.get('platformId'));
    this.loadData();
  }

  loadData() {
    if (this.platformId) {
      this.apiService.getPlatform(this.platformId).subscribe(
        data => this.platform = data
      )
    }
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  update() {
    if (this.platformId) {
      const platformData: UpdatePlatform = {
        name: this.name,
        releaseDate: this.releaseDate,
        detail: this.detail,
        picture: this.picture
      };

      this.apiService.updatePlatform(this.platformId, platformData).subscribe({
        next: (res) => {
          console.log('updated: ', res);
          this.localizationService.translate(['TOAST_PLATFORM_UPDATED']).subscribe(async (values) => {
            this.router.navigate(['/platforms']).then(() => {
              window.location.reload();
            });
            await this.presentToast(values['TOAST_PLATFORM_UPDATED'], 'success');
          })
        },
        error: async (err) => {
          console.error('error: ', err);
          this.localizationService.translate(['WARNING_GENERIC', 'WARNING_PLATFORM_NAME_ALREADYREGISTERED']).subscribe(async (values) => {
            let errorMsg = values['WARNING_GENERIC'];

            if (err.status == 409) {
              errorMsg = values['WARNING_PLATFORM_NAME_ALREADYREGISTERED'];
            }

            await this.presentToast(errorMsg, 'danger');
          });
        }
      });
    }
  }
}