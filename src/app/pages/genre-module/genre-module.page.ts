import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Genre } from 'src/app/core/interfaces/genre/genre';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonSearchbar, IonRefresher, IonRefresherContent, IonItemOptions, IonItemOption, IonItemSliding, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, trashSharp, add } from 'ionicons/icons';


@Component({
  selector: 'app-genre-module',
  templateUrl: './genre-module.page.html',
  styleUrls: ['./genre-module.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonSearchbar, IonRefresher, IonRefresherContent, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonFab, IonFabButton, RouterLink]
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
   * @param apiService          API Service
   * @param localizationService Localization Service
   * @param toastCtrl           Toast Controller
   * @param router              Router
   */
  constructor(
    private apiService: ApiService,
    private localizationService: LocalizationService,
    private toastCtrl: ToastController,
    private router: Router
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

  goToUpdatePage(genreId: number) {
    this.router.navigate(['/genres/update', genreId]);
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

  delete(genreId: number) {
    this.apiService.deleteGenre(genreId).subscribe({
      next: (res) => {
        this.localizationService.translate(['TOAST_GENRE_DELETED']).subscribe(async (values) => {
          this.router.navigate(['/genres']).then(() => {
            window.location.reload();
          });
          await this.presentToast(values['TOAST_GENRE_DELETED']);
        });
      }
    });
  }
}