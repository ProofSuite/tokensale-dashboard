import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSidebarComponent } from './header-sidebar/header-sidebar.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { SendComponent } from './send/send.component';
import { EtherBalanceComponent } from './ether-balance/ether-balance.component';
import { TokenBalanceComponent } from './token-balance/token-balance.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UtilityModule} from "../utility/utility.module";
import {
  DataTableModule,
  DropdownModule,
  InputSwitchModule,
  MessagesModule,
  SharedModule,
  TooltipModule
} from "primeng/primeng";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxQRCodeModule} from "ngx-qrcode2";
import { SettingsComponent } from './settings/settings.component';
import { EtheriumComponent } from './header-sidebar/etherium/etherium.component';
import { LoadWalletComponent } from './header-sidebar/load-wallet/load-wallet.component';
import { BuyTokensComponent } from './header-sidebar/buy-tokens/buy-tokens.component';
import { ReferralProgramComponent } from './referral-program/referral-program.component';
import { ReferralStatusComponent } from './referral-status/referral-status.component';
import {MyAutofocusDirective} from "./focus.directive";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
    TooltipModule,
    DataTableModule,
    MessagesModule,
    SharedModule,
    InputSwitchModule,
    FormsModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    UtilityModule,
    AdminRoutingModule
  ],
  declarations: [
    HeaderSidebarComponent,
    DashboardComponent,
    TransactionHistoryComponent,
    SendComponent,
    EtherBalanceComponent,
    TokenBalanceComponent,
    AddressInfoComponent,
    UserProfileComponent,
    SettingsComponent,
    EtheriumComponent,
    LoadWalletComponent,
    BuyTokensComponent,
    ReferralProgramComponent,
    ReferralStatusComponent,
    FooterComponent
  ],
  exports:[HeaderSidebarComponent]
})
export class AdminModule { }
