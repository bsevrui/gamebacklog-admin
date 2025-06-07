import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Game } from 'src/app/core/interfaces/game/game';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { addIcons } from 'ionicons';
import { saveSharp, close } from 'ionicons/icons';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, IonButtons, IonBackButton]
})
export class AddPage implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    addIcons({ close, saveSharp })
  }

  ngOnInit() {}
}