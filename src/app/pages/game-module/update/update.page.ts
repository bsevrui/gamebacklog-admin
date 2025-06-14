import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Game } from 'src/app/core/interfaces/game/game';
import { Genre } from 'src/app/core/interfaces/genre/genre';
import { UpdateGame } from 'src/app/core/interfaces/game/update-game';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonListHeader, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveSharp, close } from 'ionicons/icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, RouterLink, IonButtons, IonBackButton, IonList, IonListHeader, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, IonCheckbox]
})
export class UpdatePage implements OnInit {
  private gameId?: number;
  public game?: Game;
  public genres?: Genre[];
  public title?: string;
  public type?: 'Game' | 'DLC/Expansion';
  public cover?: string;
  public selectedGenres: { [key: number]: boolean } = {};

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
    this.gameId = Number(this.activatedRoute.snapshot.paramMap.get('gameId'));
    this.loadData();
  }

  loadData() {
    if (this.gameId) {
      this.apiService.getGame(this.gameId).subscribe(
        data => this.game = data
      );
    }

    this.apiService.getGenres().subscribe(
      data => this.genres = data
    );
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
    if (this.gameId) {
      const selectedGenreIds = Object.keys(this.selectedGenres).filter((key) => this.selectedGenres[Number(key)]).map((key) => Number(key));

      const gameData: UpdateGame = {
        title: this.title,
        type: this.type,
        cover: this.cover,
        genres: selectedGenreIds
      }

      this.apiService.updateGame(this.gameId, gameData).subscribe({
        next: (res) => {
          console.log('updated: ', res);
          this.localizationService.translate(['TOAST_GAME_UPDATED']).subscribe(async (values) => {
            this.router.navigate(['/games']).then(() => {
              window.location.reload();
            });
            await this.presentToast(values['TOAST_GAME_UPDATED'], 'success');
          })
        },
        error: async (err) => {
          console.error('error: ', err);
          this.localizationService.translate(['WARNING_GAME_TITLE_ALREADYREGISTERED', 'WARNING_GENERIC']).subscribe(async (values) => {
            let errorMsg = values['WARNING_GENERIC'];
            
            if (err.status == 409) {
              errorMsg = values['WARNING_GAME_TITLE_ALREADYREGISTERED'];
            }

            await this.presentToast(errorMsg, 'danger');
          });
        }
      });
    }
  }
}