import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonButton, IonIcon, IonButtons, IonBackButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/core/services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from 'src/app/core/interfaces/user/user';
import { addIcons } from 'ionicons';
import { saveSharp, close, mail } from 'ionicons/icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, TranslateModule, FormsModule, RouterLink, IonSelect, IonSelectOption, IonButton, IonList, IonItem, IonIcon, IonBackButton, IonButtons, IonLabel, IonInput]
})
export class UpdatePage implements OnInit {
  private userId?: number;
  public user?: User;
  public username?: string;
  public role?: 'ADMIN' | 'USER';
  public birthdate?: Date;
  public firstName?: string;
  public lastName?: string;
  public profilePicture?: string;

  /**
   * 
   * @param apiService API Service
   * @param activatedRoute Activated Route
   * @param router Router
   */
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ saveSharp, close, mail });
  }

  ngOnInit() {
    this.userId = Number(this.activatedRoute.snapshot.paramMap.get('userId'));
    this.loadData();
  }

  loadData() {
    if (this.userId) {
      this.apiService.getUser(this.userId).subscribe(
        (data) => {
          this.user = data;
        }
      );
    }
  }

  update() {
    if (this.userId) {
      this.apiService.updateUser(this.userId, {
        username: this.username,
        role: this.role,
        birthdate: this.birthdate,
        firstName: this.firstName,
        lastName: this.lastName,
        profilePicture: this.profilePicture
      }).subscribe({
        next: (res) => {
          console.log('updated: ', res);
          this.router.navigate(['/users']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => console.error('error: ', err)
      });
    }
  }
}