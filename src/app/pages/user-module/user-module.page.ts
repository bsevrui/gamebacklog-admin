import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonLabel, IonAvatar, IonSearchbar, IonRefresher, IonRefresherContent, IonIcon } from '@ionic/angular/standalone';
import { User } from 'src/app/core/interfaces/user';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { create, trashSharp } from 'ionicons/icons';

@Component({
  selector: 'app-user-module',
  templateUrl: './user-module.page.html',
  styleUrls: ['./user-module.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, IonButtons, IonMenuButton, IonList, IonItemSliding, IonItem, IonItemOptions, IonItemOption, IonLabel, IonAvatar, IonSearchbar, IonRefresher, IonRefresherContent, IonIcon]
})
export class UserModulePage implements OnInit {
  /* Flag for the users' array */
  private users: User[] = [];
  /* Flag for search query */
  public searchQuery: string = "";
  /* Flag for filtered users */
  public filteredUsers: User[] = [];

  /**
   * Constructor
   * @param apiService API Service.
   * @param router Router.
   */
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    addIcons({ create, trashSharp });
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

  loadData() {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
      }
    );
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user => user.username.toLowerCase().includes(this.searchQuery.toLowerCase())));
  }

  goToUpdatePage(userId: number) {
    this.router.navigate(['/users/update', userId]);
  }

  delete(userId: number) {
    this.apiService.deleteUser(userId).subscribe({
      next: (res) => {
        this.router.navigate(['/users']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}