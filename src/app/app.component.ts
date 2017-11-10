import { Component } from '@angular/core';
import {SharedService} from "./utility/shared-service/shared.service";
import {Router} from "@angular/router";
import {RouteConstants} from "./utility/constants/routes";
import {TranslateService} from "./utility/translate/translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isOpen = true;

  constructor(private sharedService: SharedService,
            private router:Router, private translateService: TranslateService) {
    // this.sharedService.getLanguage().subscribe(language => {
    let language = this.sharedService.getLanguage();
      if (language) {
        this.translateService.use(language);
      } else {
        this.translateService.use('en');  //Your default language
        this.sharedService.setLanguage('en');
      }
    // })
  }

  // Getter Methods
  get showHeader(): boolean {
    let rawUrl = this.router.url.split("?")[0];
    return this.sharedService.isLoggedIn() &&
      rawUrl !== "/" &&
      rawUrl !== "/" + RouteConstants.REFERRAR_PROGRAM &&
      rawUrl !== "/" + RouteConstants.REFERRAR_STATUS;
  }
}
