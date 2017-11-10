import {Injectable} from '@angular/core';
import {TRANSLATIONS} from './translations'

@Injectable()
export class TranslateService {
  private _currentLang: string;

  public get currentLang() {
    return this._currentLang;
  }

  // inject our translations
  constructor() {
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
  }

  private translate(key: string): string {
    // private perform translation
    let translation = key;

    if (TRANSLATIONS[this.currentLang] && TRANSLATIONS[this.currentLang][key]) {
      return TRANSLATIONS[this.currentLang][key];
    }

    return translation;
  }

  public instant(key: string) {
    // public perform translation
    return this.translate(key);
  }
}
