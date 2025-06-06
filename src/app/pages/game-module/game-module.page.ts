import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonThumbnail, IonSearchbar, IonRefresher, IonRefresherContent, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Game } from 'src/app/core/interfaces/game';
import { ApiService } from 'src/app/core/services/api.service';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { create, trashSharp } from 'ionicons/icons';

@Component({
  selector: 'app-game-module',
  templateUrl: './game-module.page.html',
  styleUrls: ['./game-module.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, TranslateModule, IonList, IonItem, IonLabel, IonThumbnail, RouterLink, IonSearchbar, IonRefresher, IonRefresherContent, IonItemSliding, IonItemOption, IonItemOptions, IonIcon]
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
   * @param apiService    API Service
   */
  constructor(private apiService: ApiService) {
    addIcons({ trashSharp, create });
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

  goToUpdatePage(gameId: number) {}

  delete(gameId: number) {}
}