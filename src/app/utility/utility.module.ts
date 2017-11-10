import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ToastsManager} from "ng2-toastr";
import {ConnectionBackend, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {ProgressHudComponent} from "./progress-hud/progress-hud.component";
import {HttpService} from "./http-service";
import {SharedService} from "./shared-service/shared.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ValidationComponent} from "./validation/validation.component";
import {APIManager} from "./shared-service/apimanager.service";
import {BaseComponent} from "./base-component/base.component";
import {NoDataComponent} from "./no-data/no-data.component";
import {SharedObjService} from "./shared-service/shared-object.service";
import {CheckEmpty} from "./pipes/checkEmpty.pipe";
import {TranslatePipe} from "./translate/translate.pipe";
import {TranslateService} from "./translate/translate.service";
import {Web3Service} from "./shared-service/web3.service";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {DropdownModule} from "primeng/primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CountryCodeComponent } from './country-code/country-code.component';
import {MyAutofocusDirective} from "../admin/focus.directive";

export function callService(backend: ConnectionBackend, options: RequestOptions, sharedService: SharedService, toastManager: ToastsManager) {
  return new HttpService(backend, options, sharedService, toastManager);
}

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    ProgressHudComponent,
    PageNotFoundComponent,
    ValidationComponent,
    NoDataComponent,
    BaseComponent,
    CheckEmpty,
    TranslatePipe,
    MyAutofocusDirective,
    LanguageSelectorComponent,
    CountryCodeComponent
  ],
  providers: [
    APIManager,
    SharedService,
    Web3Service,
    SharedObjService,
    TranslateService,
    {
      provide: HttpService,
      useFactory: callService,
      deps: [XHRBackend, RequestOptions, SharedService, ToastsManager]
    }
  ],
  exports: [
    ProgressHudComponent,
    PageNotFoundComponent,
    ValidationComponent,
    NoDataComponent,
    CheckEmpty,
    BaseComponent,
    TranslatePipe,
    LanguageSelectorComponent,
    MyAutofocusDirective,
    CountryCodeComponent]
})

export class UtilityModule {
}
