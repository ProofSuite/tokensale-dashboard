import {slideUp} from "../../animation";
import {Component, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {APIManager} from "../../../utility/shared-service/apimanager.service";
import {ToastsManager} from "ng2-toastr";
import {API} from "../../../utility/constants/api";
import {SharedService} from "../../../utility/shared-service/shared.service";
import {BaseComponent} from "../../../utility/base-component/base.component";
import {Router} from "@angular/router";
import {RouteConstants} from "../../../utility/constants/routes";

@Component({
  selector: 'app-etherium',
  templateUrl: './etherium.component.html',
  styleUrls: ['./etherium.component.css'],
  animations: [slideUp]
})
export class EtheriumComponent extends BaseComponent implements OnInit {

  isShowModal: number = 1;
  isNeedEther: boolean = true;
  address: string = "";
  elementType: 'url' | 'canvas' | 'img' = 'url';

  constructor(private router: Router, private sharedService: SharedService, private apiManager: APIManager, public toastr: ToastsManager,
              public vcr: ViewContainerRef) {
    super(toastr, vcr);
  }

  ngOnInit() {

  }

  noNeedEther() {
    this.sharedService.trackMixPanelEvent("No I dont have Ether");
    this.isNeedEther = false;
  }

  openWallet() {
    this.sharedService.trackMixPanelEvent("Yes I do Have Ether Button");
    this.router.navigate(["/" + RouteConstants.WALLET]);
  }

  buyEtherWithBitCoin() {
    this.sharedService.setLoader(true);
    let body = {
      withdrawal: this.sharedService.getWalletAddress.address,
      pair: "BTC_ETH"
    }
    this.apiManager.postLocalAPI(API.BUY_ETHER, body).subscribe(res=> {
      this.sharedService.setLoader(false);
      this.address = res["deposit"];
      this.isShowModal = 2;
      this.getBitCoinBalance();
    }, error=> {
      this.sharedService.setLoader(false);
      //console.log(error);
    })
  }

  getBitCoinBalance() {
    this.sharedService.setLoader(true);
    this.apiManager.getLocalAPI(API.CHECK_BITCOIN_BALANCE + this.address).subscribe(res=> {
      //console.log(res)
      this.sharedService.setLoader(false);
    }, error=> {
      this.sharedService.setLoader(false);
      //console.log(error);
    })
  }

  //Esc event
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
      this.isShowModal = 1;
    }
  }
}
