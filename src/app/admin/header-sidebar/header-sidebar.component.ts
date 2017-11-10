import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from "../../utility/shared-service/shared.service";
import {RouteConstants} from "../../utility/constants/routes";
import {User} from "../../utility/shared-model/shared-user.model";
import {Router, NavigationEnd} from "@angular/router";

import {style, transition, animate, trigger} from "@angular/animations";
import {slideDown, slideUp} from "../animation";

import {Web3Service} from "../../utility/shared-service/web3.service";
import {Contract} from "../../utility/constants/base-constants";
import {Landing} from "../../user-auth/landing/landing.model";
import {API} from "../../utility/constants/api";
import {APIManager} from "../../utility/shared-service/apimanager.service";


@Component({
  selector: 'header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.css'],
  animations: [
    trigger('sideAmination', [
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateX(-100%)'}))
      ])
    ]),
    slideUp, slideDown
  ]
})
export class HeaderSidebarComponent implements OnInit {

  @Output() menuToggle = new EventEmitter<boolean>();
  etherBalance: string = "0";
  tokenBalance: string = "0";
  isOpenSidebar: boolean = true;
  isOpenMobileSidebar: boolean = false;
  currentPath: string;
  user: User;
  address;
  landing: Landing;
  loaderEther: boolean = false;
  loaderProof: boolean = false;

  constructor(private apiManager: APIManager, private sharedService: SharedService, private web3Service: Web3Service,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.sharedService.getUser();
    this.getData();
    if (this.sharedService.getWalletAddress) {
      this.address = "0x" + this.sharedService.getWalletAddress.address;
      this.checkAccountBalance(this.address);
      this.checkProofAccountBalance(this.address);

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.checkAccountBalance(this.address);
          this.checkProofAccountBalance(this.address);
        }
      });
    }
  }

  currentRoute() {
    let currentRoute = window.location.pathname;
    let currentRoute1 = currentRoute.split('/');
    // console.log("current Route:=>",currentRoute1[1]);
    this.currentPath = currentRoute1[1];
  }

  onToggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
    this.menuToggle.emit(this.isOpenSidebar);
  }

  onMobileToggleSidebar() {
    this.isOpenMobileSidebar = !this.isOpenMobileSidebar;
    this.menuToggle.emit(this.isOpenMobileSidebar);
  }

  closeSidebar() {
    this.isOpenMobileSidebar = false;
  }

  getTokenPrice() {
    return Contract.TOKEN_PRICE;
  }

  logout() {
    this.sharedService.logout();
  }

  get profileUrl() {
    return "/" + RouteConstants.USER_PROFILE;
  }

  get dashboardUrl() {
    return "/" + RouteConstants.DASHBOARD;
  }

  get transactionHistoryUrl() {
    return "/" + RouteConstants.TRANSACTION_HISTORY;
  }

  get sendUrl() {
    return "/" + RouteConstants.SEND;
  }

  get etherUrl() {
    return "/" + RouteConstants.ETHER_BALANCE;
  }

  get tokenUrl() {
    return "/" + RouteConstants.TOKEN_BALANCE;
  }

  get addressInfoUrl() {
    return "/" + RouteConstants.ADDRESS_INFO;
  }

  get referralProgramUrl() {
    return "/" + RouteConstants.REFERRAR_PROGRAM;
  }

  get settingsUrl() {
    return "/" + RouteConstants.SETTINGS;
  }

  get changePasswordUrl() {
    return "/" + RouteConstants.CHANGE_PASSWORD;
  }

  get ethereumUrl() {
    return "/" + RouteConstants.GET_ETHERIUM;
  }

  get walletUrl() {
    return "/" + RouteConstants.WALLET;
  }

  get buyTokens() {
    return "/" + RouteConstants.BUY_TOKEN;
  }

  walletUrlEvent() {
    this.sharedService.trackMixPanelEvent("Second Step Button");
  }

  buyTokensEvent() {
    this.sharedService.trackMixPanelEvent("Third Step Button");
  }


  checkAccountBalance(account) {
    if (this.loaderEther)
      this.sharedService.trackMixPanelEvent("Refresh Ether Balance");
    this.etherBalance = "";
    this.web3Service.getEtherAccountBalance(account).subscribe(result=> {
      this.etherBalance = result;
      this.loaderEther = false;
    }, error=> {
      // this.etherBalance = error;

      //console.log(error);
    });
  }

  checkProofAccountBalance(account) {
    if (this.loaderProof)
      this.sharedService.trackMixPanelEvent("Refresh Proof Balance");
    this.tokenBalance = "";
    this.web3Service.getTokenBalance(account).subscribe(result=> {
      this.tokenBalance = result;

      this.loaderProof = false;
    }, error=> {
      // this.tokenBalance = error;

      //console.log(error);
    });
  }

  getData() {
    this.apiManager.getLocalAPI(API.DASHBOARD).subscribe(res=> {
      this.landing = res.message;
    }, error=> {

    })
  }

  getProofTokensRaised(erc20Units): number {
    if (erc20Units) {
      return Math.round(erc20Units / (10 ** 18));
    }
    else {
      return 0;
    }
  }


}
