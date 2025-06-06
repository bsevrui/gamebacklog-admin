import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonSearchbar, IonRefresher, IonRefresherContent, IonItemOptions, IonItemOption, IonItemSliding, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Genre } from 'src/app/core/interfaces/genre';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { create, trashSharp } from 'ionicons/icons';


@Component({
  selector: 'app-genre-module',
  templateUrl: './genre-module.page.html',
  styleUrls: ['./genre-module.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonSearchbar, IonRefresher, IonRefresherContent, IonItemSliding, IonItemOptions, IonItemOption, IonIcon]
})
export class GenreModulePage implements OnInit {
  /* Flag for the genres' array */
  private genres: Genre[] = [];
  /* Flag for search query */
  public searchQuery: string = "";
  /* Flag for filtered genres */
  public filteredGenres: Genre[] = [];

  /**
   * Constructor
   * @param apiService    API Service
   * @param router        Router
   */
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
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
   * Loads genres from db
   */
  loadData() {
    this.apiService.getGenres().subscribe(
      (data) => {
        this.genres = data;
        this.filteredGenres = data;
      }
    );
  }

  filterGenres() {
    this.filteredGenres = this.genres.filter((genre => genre.name.toLowerCase().includes(this.searchQuery.toLowerCase())));
  }

  goToUpdatePage(genreId: number) {}

  delete(genreId: number) {
    this.apiService.deleteGenre(genreId).subscribe({
      next: (res) => {
        this.router.navigate(['/genres']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}