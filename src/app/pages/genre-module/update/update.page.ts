import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Genre } from 'src/app/core/interfaces/genre/genre';
import { UpdateGenre } from 'src/app/core/interfaces/genre/update-genre';
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
  private genreId?: number;
  public genre?: Genre;
  public name?: string;
  public description?: string;

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
    this.genreId = Number(this.activatedRoute.snapshot.paramMap.get('genreId'));
    this.loadData();
  }

  loadData() {
    if (this.genreId) {
      this.apiService.getGenre(this.genreId).subscribe(
        data => this.genre = data
      );
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
    if (this.genreId) {
      const genreData: UpdateGenre = {
        name: this.name,
        description: this.description
      }

      this.apiService.updateGenre(this.genreId, genreData).subscribe({
        next: (res) => {
          this.localizationService.translate(['TOAST_GENRE_UPDATED']).subscribe(async (values) => {
            this.router.navigate(['/genres']).then(() => {
              window.location.reload();
            });
            await this.presentToast(values['TOAST_GENRE_UPDATED'], 'success');
          })
        },
        error: async (err) => {
          this.localizationService.translate(['WARNING_GENERIC', 'WARNING_GENRE_NAME_ALREADYREGISTERED']).subscribe(async (values) => {
            let errorMsg = values['WARNING_GENERIC'];

            if (err.status == 409) {
              errorMsg = values['WARNING_GENRE_NAME_ALREADYREGISTERED'];
            }

            await this.presentToast(errorMsg, 'danger');
          });
        }
      });
    }
  }
}