import {Component, OnInit} from '@angular/core';
import {slideUp} from "../animation";
import {Router} from "@angular/router";
import {RouteConstants} from "../../utility/constants/routes";
import {API} from "../../utility/constants/api";
import {APIManager} from "../../utility/shared-service/apimanager.service";
import {SharedService} from "../../utility/shared-service/shared.service";
import {TransactionHistory} from "./history.model";
import {Web3Service} from "../../utility/shared-service/web3.service";

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
  animations: [slideUp]
})
export class TransactionHistoryComponent implements OnInit {

  transactionsList: TransactionHistory[];

  constructor(private web3Service: Web3Service, private sharedService: SharedService, private router: Router, private apiManager: APIManager) {
  }

  ngOnInit() {
    this.getAllTransaction(true);
  }

  getEthereum() {
    this.router.navigate(["/" + RouteConstants.GET_ETHERIUM]);
  }

  getAllTransaction(check) {
    let search = {
      userId: this.sharedService.getUser().id
    };
    let body = {
      "records": "all"
    };
    this.apiManager.getAPI(API.TRANSACTION, body, search).subscribe(response => {
      //console.log(response);
      this.transactionsList = response.payload.data;
      if (check)
        this.checkTransactionStatus();
    });
  }

  get transactionLength() {
    return this.transactionsList ? this.transactionsList.length : 0
  }

  checkTransactionStatus() {
    for (var i = 0; i < this.transactionLength; i++) {
      var transaction = this.transactionsList[i];
      if (transaction.status == 'Pending') {
        this.web3Service.getTransactionStatus(transaction.transactionHash, transaction._id).subscribe(response => {
          this.updateTransactionStatus(response);
          // console.log(response);
        }, error=> {
          // console.log(error);
        });
      }
    }
  }

  updateTransactionStatus(id) {
    let body = {
      "status": "Completed"
    };
    this.apiManager.putAPI(API.TRANSACTION + "/" + id, body).subscribe(response => {
      this.getAllTransaction(false);
    });
  }

}
