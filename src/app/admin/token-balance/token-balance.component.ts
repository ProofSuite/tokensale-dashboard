import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../utility/shared-service/shared.service";
import {Web3Service} from "../../utility/shared-service/web3.service";
import {slideUp} from "../animation";

@Component({
  selector: 'app-token-balance',
  templateUrl: './token-balance.component.html',
  styleUrls: ['./token-balance.component.css'],
  animations: [slideUp]
})
export class TokenBalanceComponent implements OnInit {

  balance: string = "0";
  loaderProof: boolean = true;

  constructor(private sharedService: SharedService, private web3Service: Web3Service) {

  }

  ngOnInit() {
    this.tokenBalanceRefresh();
  }

  checkAccountBalance(account) {
    this.web3Service.getTokenBalance(account).subscribe(result=> {
      this.balance = result;
      this.loaderProof = false;
    }, error=> {
      this.balance = error;
      //console.log(error);
    });
  }

  tokenBalanceRefresh() {
    this.loaderProof = true;
    this.sharedService.trackMixPanelEvent("Refresh Proof Balance");
    this.balance = "0";
    this.checkAccountBalance(this.sharedService.getWalletAddress.address);
  }

}
