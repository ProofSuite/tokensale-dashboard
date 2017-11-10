import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../utility/shared-service/shared.service";
import {Web3Service} from "../../utility/shared-service/web3.service";
import {slideUp} from "../animation";

@Component({
  selector: 'app-ether-balance',
  templateUrl: './ether-balance.component.html',
  styleUrls: ['./ether-balance.component.css'],
  animations: [slideUp]
})
export class EtherBalanceComponent implements OnInit {
  balance: string = "0";
  loaderEther: boolean = true;

  constructor(private sharedService: SharedService, private web3Service: Web3Service) {

  }

  ngOnInit() {
    this.etherBalanceRefresh()
  }

  checkAccountBalance(account) {
    this.web3Service.getEtherAccountBalance(account).subscribe(result=> {
      this.loaderEther = false;
      this.balance = result;
    }, error=> {
      this.balance = error;
      //console.log(error);
    });
  }

  etherBalanceRefresh() {
    this.loaderEther = true;
    this.sharedService.trackMixPanelEvent("Refresh Ether Balance");
    this.balance = "0";
    this.checkAccountBalance(this.sharedService.getWalletAddress.address);
  }

}
