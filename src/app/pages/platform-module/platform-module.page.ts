import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonThumbnail, IonSearchbar, IonRefresher, IonRefresherContent, IonIcon, IonItemSliding, IonItemOption, IonItemOptions, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Platform } from 'src/app/core/interfaces/platform/platform';
import { ApiService } from 'src/app/core/services/api.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, create, trashSharp } from 'ionicons/icons';

@Component({
  selector: 'app-platform-module',
  templateUrl: './platform-module.page.html',
  styleUrls: ['./platform-module.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, TranslateModule, IonList, IonLabel, IonItem, IonThumbnail, IonSearchbar, IonRefresher, IonRefresherContent, IonIcon, IonItemSliding, IonItemOption, IonItemOptions, IonFab, IonFabButton, RouterLink]
})
export class PlatformModulePage implements OnInit {
  /* Flag for the platforms' array */
  private platforms: Platform[] = [];
  /* Flag for search query */
  public searchQuery: string = "";
  /* Flag for filtered platforms */
  public filteredPlatforms: Platform[] = [];

  /**
   * Constructor
   * @param apiService    API Service
   * @param router        Router
   */
  constructor(
    private apiService: ApiService,
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
   * Loads platforms from db
   */
  loadData() {
    this.apiService.getPlatforms().subscribe(
      (data) => {
        this.platforms = data;
        this.filteredPlatforms = data;
      }
    );
  }

  filterPlatforms() {
    this.filteredPlatforms = this.platforms.filter((platform => platform.name.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())));
  }

  goToUpdatePage(platformId: number) {
    this.router.navigate(['/platforms/update', platformId]);
  }

  delete(platformId: number) {
    this.apiService.deletePlatform(platformId).subscribe({
      next: (res) => {
        this.router.navigate(['/platforms']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}