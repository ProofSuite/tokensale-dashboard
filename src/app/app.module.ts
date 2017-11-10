import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthGaurd} from "./_guards/auth.gaurds";
import {UtilityModule} from "./utility/utility.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "ng2-toastr";
import {UserAuthModule} from "./user-auth/user-auth.module";
import {AdminModule} from "./admin/admin.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UtilityModule,
    AdminModule,
    BrowserAnimationsModule,
    UserAuthModule,
    ToastModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
