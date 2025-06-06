import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  /**
   * Constructor
   * @param translateService Translate Service
   */
  constructor(
    public translateService: TranslateService,
  ) {}

  initializeLocalization(): void {
    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang) {
      switch (browserLang) {
        case "en": {
          this.translateService.use('en');
          break;
        }
        case "es": {
          this.translateService.use('es');
          break;
        }
        case "zh": {
          const browserCultureLang = this.translateService.getBrowserCultureLang();
          if (browserCultureLang?.match(/-CN|CHS|HANS/i)) {
            this.translateService.use('zh-cmn-Hans');
          } else if (browserCultureLang?.match(/-TW|CHT|Hant/i)) {
            this.translateService.use('zh-cmn-Hant');
          }
          break;
        }
        default: {
          this.translateService.use('en');
          break;
        }
      }
    } else {
      this.translateService.use('en');
    }
  }

  translate(key: string | Array<string>): Observable<string | any> {
    return this.translateService.get(key);
  }

  getLanguage(): string {
    return String(this.translateService.getBrowserLang());
  }
}