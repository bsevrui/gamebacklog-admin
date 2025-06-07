import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { RouterLink, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CreateGame } from 'src/app/core/interfaces/game/create-game';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveSharp, close } from 'ionicons/icons';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, IonButtons, IonBackButton, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, RouterLink]
})
export class AddPage implements OnInit {
  public title: string = "";
  public type: 'Game' | 'DLC/Expansion' = 'Game';
  public cover?: string;

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
    addIcons({ close, saveSharp })
  }

  ngOnInit() {}

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  async create() {
    if (this.title != "" && this.type) {
      const gameData: CreateGame = {
        title: this.title,
        type: this.type,
        cover: this.cover
      };

      this.apiService.createGame(gameData).pipe(
        catchError((error) => {
          this.localizationService.translate(['WARNING_GENERIC', 'WARNING_GAME_ALREADYCREATED']).subscribe(async (values) => {
            //
          });
          return of(null);
        })
      )
    } else {
      this.localizationService.translate(['WARNING_MANDATORY_FIELDS']).subscribe(async (values) => {
        this.presentToast(values['WARNING_MANDATORY_FIELDS'], 'warning');
      });
    }

    /*
    if (this.title != "" && this.type != null) {
      const gameData: CreateGame = {
        title: this.title,
        type: this.type,
        cover: this.cover
      };
      this.apiService.createGame(gameData).subscribe(
        async (res) => {
          this.localizationService.translate(['TOAST_GAME_CREATED']).subscribe(async (values) => {
            this.router.navigate(['/games']).then(() => {
              window.location.reload();
            });
            await this.presentToast(values['TOAST_GAME_CREATED']);
          });
        },
        async (err) => {
          this.localizationService.translate(['WARNING_GENERIC', 'WARNING_GAME_ALREADYCREATED']).subscribe(async (values) => {
            let errorMsg = values['WARNING_GENERIC'];
            if (err == "game already exist") {
              errorMsg = values['WARNING_GAME_ALREADYCREATED'];
            }
            await this.presentToast(errorMsg);
          });
        }
      )
    } else {
      this.localizationService.translate(['WARNING_MANDATORY_FIELDS']).subscribe(async (values) => {
        await this.presentToast(values['WARNING_MANDATORY_FIELDS']);
      });
    }
    */
  }
}