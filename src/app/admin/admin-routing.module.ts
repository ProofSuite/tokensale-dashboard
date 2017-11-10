import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RouteConstants} from "../utility/constants/routes";
import {AuthGaurd} from "../_guards/auth.gaurds";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TransactionHistoryComponent} from "./transaction-history/transaction-history.component";
import {SendComponent} from "./send/send.component";
import {EtherBalanceComponent} from "./ether-balance/ether-balance.component";
import {TokenBalanceComponent} from "./token-balance/token-balance.component";
import {AddressInfoComponent} from "./address-info/address-info.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {EtheriumComponent} from "./header-sidebar/etherium/etherium.component";
import {LoadWalletComponent} from "./header-sidebar/load-wallet/load-wallet.component";
import {BuyTokensComponent} from "./header-sidebar/buy-tokens/buy-tokens.component";
import {ReferralProgramComponent} from "./referral-program/referral-program.component";
import {ReferralStatusComponent} from "./referral-status/referral-status.component";

const routes: Routes = [
  {
    path: RouteConstants.DASHBOARD,
    component: DashboardComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.TRANSACTION_HISTORY,
    component: TransactionHistoryComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.SEND,
    component: SendComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.ETHER_BALANCE,
    component: EtherBalanceComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.TOKEN_BALANCE,
    component: TokenBalanceComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.ADDRESS_INFO,
    component: AddressInfoComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.USER_PROFILE,
    component: UserProfileComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.SETTINGS,
    component: SettingsComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.GET_ETHERIUM,
    component: EtheriumComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.WALLET,
    component: LoadWalletComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.BUY_TOKEN,
    component: BuyTokensComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.REFERRAR_PROGRAM,
    component: ReferralProgramComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: RouteConstants.REFERRAR_STATUS,
    component: ReferralStatusComponent,
    canActivate: [AuthGaurd]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class AdminRoutingModule {}
