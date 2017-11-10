import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../utility/shared-service/shared.service";
import {Web3Service} from "../../utility/shared-service/web3.service";
import * as FileSaver from 'file-saver';
import {Wallet} from "../../utility/shared-model/wallet.model";
import {slideUp} from "../animation";

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css'],
  animations: [slideUp]
})
export class AddressInfoComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'img' = 'url';
  address: string = "";
  etherBalance: string = "0";
  tokenBalance: string = "0";
  wallet: Wallet;

  constructor(private sharedService: SharedService, private web3Service: Web3Service) {

  }

  ngOnInit() {
    this.address = "0x" + this.sharedService.getWalletAddress.address;
    this.checkAccountBalance(this.address);
    this.checkProofAccountBalance(this.address);
  }

  checkAccountBalance(account) {
    this.web3Service.getEtherAccountBalance(account).subscribe(result=> {
      this.etherBalance = result;
    }, error=> {
      this.etherBalance = error;
      //console.log(error);
    });
  }

  backupWallet() {
    this.wallet = this.sharedService.getWalletAddress;
    var date = new Date();
    var filename = 'UTC--' + date.toISOString().replace(/:/g, '-') + '--' +
      this.wallet.address.slice(2);
    var json = JSON.stringify(this.wallet);
    var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
  }

  checkProofAccountBalance(account) {
    this.web3Service.getTokenBalance(account).subscribe(result=> {
      this.tokenBalance = result;
    }, error=> {
      this.tokenBalance = error;
      //console.log(error);
    });
  }

}
