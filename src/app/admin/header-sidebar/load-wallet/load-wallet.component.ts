import { Component, OnInit } from '@angular/core';
import {Web3Service} from "../../../utility/shared-service/web3.service";
import {SharedService} from "../../../utility/shared-service/shared.service";
import {Wallet} from "../../../utility/shared-model/wallet.model";
import * as FileSaver from 'file-saver';
import {slideUp} from "../../animation";

@Component({
  selector: 'app-load-wallet',
  templateUrl: './load-wallet.component.html',
  styleUrls: ['./load-wallet.component.css'],
  animations:[ slideUp ]
})
export class LoadWalletComponent implements OnInit {

  elementType: 'url' | 'canvas' | 'img' = 'url';
  address: string = "";
  wallet: Wallet;

  constructor(private sharedService: SharedService, private web3Service: Web3Service) {

  }

  ngOnInit() {
    this.address = "0x" + this.sharedService.getWalletAddress.address;
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


}
