import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TranslateModule, IonList, IonItem, IonInput, IonButton]
})
export class LoginPage implements OnInit {
  public email?: string;
  public password?: string;

  /**
   * Constructor
   * @param authService Auth Service.
   * @param storageService Storage Service.
   * @param router Router.
   * @param toastCtrl Toast Controller.
   * @param localizationService Localization Service.
   */
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastCtrl: ToastController,
    private localizationService: LocalizationService
  ) {}

  ngOnInit() {}

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: 'warning'
    });
    await toast.present();
  }

  login() {
    if (!this.email || !this.password) {
      this.localizationService.translate(['WARNING_MANDATORY_FIELDS']).subscribe(async (values) => {
        this.presentToast(values['WARNING_MANDATORY_FIELDS']);
      });
    } else {
      const userData = {
        email: this.email,
        password: this.password
      };

      this.authService.login(userData).pipe(
        catchError(async (error) => {
          this.localizationService.translate(['WARNING_GENERIC', 'WARNING_WRONG_CREDENTIALS']).subscribe(async (values) => {
            let errorMsg = values['WARNING_GENERIC'];
            if (error?.status === 500) {
              errorMsg = values['WARNING_WRONG_CREDENTIALS'];
            }
            await this.presentToast(errorMsg);
            return of(null);
          })
        })
      ).subscribe(
        async (response) => {
          if (response) {
            await this.storageService.setUserData(response.accessToken, response.user);
            this.router.navigate(['/games']);
          }
        }
      )
    }
  }
}