import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonButton, IonIcon, IonButtons, IonBackButton, IonLabel } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/core/services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { addIcons } from 'ionicons';
import { saveSharp, close, mail } from 'ionicons/icons';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, TranslateModule, FormsModule, RouterLink, IonSelect, IonSelectOption, IonButton, IonList, IonItem, IonIcon, IonBackButton, IonButtons, IonLabel]
})
export class UpdatePage implements OnInit {
  private userId?: number;
  public user?: User;
  public role?: string;

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
    
  }
}