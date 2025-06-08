import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { RouterLink, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CreateGenre } from 'src/app/core/interfaces/genre/create-genre';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveSharp, close } from 'ionicons/icons';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, RouterLink, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonTextarea, IonButton, IonIcon]
})
export class AddPage implements OnInit {
  public name?: string;
  public description?: string;

  /**
   * Constructor
   * @param apiService API Service
   * @param localizationService Localization Service
   * @param router Router
   * @param toastCtrl Toast Controller
   */
  constructor(
    private apiService: ApiService,
    private localizationService: LocalizationService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    addIcons({ saveSharp, close });
  }

  ngOnInit() {}

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  async create() {
    if (this.name) {
      const genreData: CreateGenre = {
        name: this.name,
        description: this.description
      };

      this.apiService.createGenre(genreData).pipe(
        catchError((error) => {
          this.localizationService.translate(['WARNING_GENERIC', 'WARNING_GENRE_ALREADYCREATED']).subscribe(async (values) => {
            let errorMsg = values['WARNING_GENERIC'];

            if (error?.error?.message == 'genre already registered') {
              errorMsg = values['WARNING_GENRE_ALREADYCREATED'];
            }

            this.presentToast(errorMsg, 'danger');
          });
          return of(null);
        })
      ).subscribe((res) => {
        if (res) {
          this.localizationService.translate(['TOAST_GENRE_CREATED']).subscribe(async (values) => {
            this.router.navigate(['/genres']).then(() => {
              window.location.reload();
            });
            await this.presentToast(values['TOAST_GENRE_CREATED'], 'success');
          });
        }
      })
    } else {
      this.localizationService.translate(['WARNING_MANDATORY_FIELDS']).subscribe(async (values) => {
        this.presentToast(values['WARNING_MANDATORY_FIELDS'], 'warning');
      });
    }
  }
}