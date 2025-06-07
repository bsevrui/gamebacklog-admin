import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Game } from 'src/app/core/interfaces/game/game';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonThumbnail, IonSearchbar, IonRefresher, IonRefresherContent, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, create, trashSharp } from 'ionicons/icons';

@Component({
  selector: 'app-game-module',
  templateUrl: './game-module.page.html',
  styleUrls: ['./game-module.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, TranslateModule, IonList, IonItem, IonLabel, IonThumbnail, IonSearchbar, IonRefresher, IonRefresherContent, IonItemSliding, IonItemOption, IonItemOptions, IonIcon, IonFab, IonFabButton, RouterLink]
})
export class GameModulePage implements OnInit {
  /* Flag for the games' array */
  private games: Game[] = [];
  /* Flag for search query */
  public searchQuery: string = "";
  /* Flag for filtered games */
  public filteredGames: Game[] = [];

  /**
   * Constructor
   * @param apiService            API Service
   * @param localizationService   Localization Service
   * @param router                Router
   * @param toastCtrl             Toast Controller
   */
  constructor(
    private apiService: ApiService,
    private localizationService: LocalizationService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    addIcons({ trashSharp, create, add });
  }

  ngOnInit() {
    this.loadData();
  }

  doRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * Loads games from db
   */
  loadData() {
    this.apiService.getGames().subscribe(
      (data) => {
        this.games = data;
        this.filteredGames = data;
      }
    );
  }

  filterGames() {
    this.filteredGames = this.games.filter((game => game.title.toLowerCase().includes(this.searchQuery.toLowerCase())));
  }

  goToUpdatePage(gameId: number) {
    this.router.navigate(['/games/update', gameId]);
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

  delete(gameId: number) {
    this.apiService.deleteGame(gameId).subscribe({
      next: (res) => {
        this.localizationService.translate(['TOAST_GAME_DELETED']).subscribe(async (values) => {
          this.router.navigate(['/games']).then(() => {
            window.location.reload();
          });
          await this.presentToast(values['TOAST_GAME_DELETED']);
        });
      },
      error: (err) => console.error('error: ', err)
    });
  }
}