import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserAuthRoutingModule} from "./user-auth-routing.module";
import {UserAuthService} from "./user-auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilityModule} from "../utility/utility.module";
import {LoginComponent} from "./login/login.component";
import {ToastModule} from "ng2-toastr";
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import {ChartModule, DialogModule, DropdownModule, TooltipModule} from 'primeng/primeng';
import { LandingComponent } from './landing/landing.component';
import { CompleteIcoComponent } from './complete-ico/complete-ico.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    TooltipModule,
    ChartModule,
    UtilityModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    UserAuthRoutingModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    LandingComponent,
    CompleteIcoComponent,
    ImageUploadComponent],
  providers: [UserAuthService],
  exports: [
    LoginComponent,
    RegisterComponent]
})

export class UserAuthModule {
}
