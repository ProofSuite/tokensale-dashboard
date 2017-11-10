import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {SharedService} from "../../utility/shared-service/shared.service";
import {Web3Service} from "../../utility/shared-service/web3.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as sha3 from 'crypto-js/sha3';
import {ToastsManager} from "ng2-toastr";
import {BaseComponent} from "../../utility/base-component/base.component";
import {CommonRegexp} from "../../utility/constants/validations";
import {APIManager} from "../../utility/shared-service/apimanager.service";
import {API} from "../../utility/constants/api";
import {dialog, slideUp} from "../animation";
import {TranslateService} from "../../utility/translate/translate.service";
import * as moment from 'moment';
import {Message} from "primeng/primeng";
import {TokenContract} from "../../utility/constants/base-constants";
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
  animations: [slideUp, dialog]
})
export class SendComponent extends BaseComponent implements OnInit {

  sendForm: FormGroup;
  passwordForm: FormGroup;
  isAddressValid: boolean = true;
  isShowModal: number = 1;
  balance: any;
  address: string = "";
  totalText: string = "Total USD : ";
  private etherPrice;
  private gasPrice = 0;
  private transactionFee;
  etherBalance: string = "0";
  tokenBalance: string = "0";
  msgs: Message[] = [];
  checkTime: boolean = true;

  constructor(private sharedService: SharedService,
              private web3Service: Web3Service,
              private fb: FormBuilder,
              private apiManager: APIManager,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef,
              public translateService: TranslateService) {
    super(toastr, vcr);
  }

  ngOnInit() {
    this.createSendForm();
    this.createPasswordForm();
    this.address = "0x" + this.sharedService.getWalletAddress.address;
    this.changeCurrency("0");
    this.getEtherPrice();
    this.getGas();
    this.getTime();
    this.checkAccountBalance(this.address);
    this.checkProofAccountBalance(this.address);
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      password: new FormControl('')
    })
  }

  createSendForm() {
    this.balance = null;
    this.sendForm = this.fb.group({
      currency: new FormControl('0'),
      destination: new FormControl(''),
      amount: new FormControl('', [<any>Validators.pattern(CommonRegexp.NUMERIC_FLOAT_REGEXP)])
    }, {validator: this.validBalanceAmount.bind(this)})
  }


  validBalanceAmount(fg: FormGroup) {
    let amount = fg.value["amount"]
    let currency = fg.value["currency"]
    let valid = true;
    let errorType = "";
    if (currency == "0") {
      if (+this.etherBalance <= +amount) {
        valid = false;
        errorType = "invalidEtherBalance";
      }
    } else {
      if (+this.tokenBalance <= +amount) {
        valid = false;
        errorType = "invalidtokenBalance";
      }
    }
    //console.log(errorType);
    return valid ? null : {[errorType]: true};
  }


  onSend(formParam, isValid) {
    this.createPasswordForm();

    if (isValid && this.isAddressValid) {
      //console.log("Send Value :", formParam);

      if (formParam.currency != "0" && this.checkTime) {
        this.toastr.error("Transfers are disabled until December 1st");
      } else
        this.isShowModal = 2;

    }
  }

  sendBalance(address, value, password) {
    this.sharedService.setLoader(true);
    try {
      password.password = this.sharedService.getPrivateKey(password.password);
    } catch (e) {
      this.sharedService.setLoader(false);
      this.toastr.error(this.translateService.instant('invalidPwd'));
      return
    }
    var gasObj = {
      to: address,
      from: this.sharedService.getWalletAddress.address,
      value: value,
      password: password.password
    };
    this.web3Service.signedTransaction(gasObj).subscribe(result=> {
      this.sharedService.setLoader(false);
      this.toastr.success(this.translateService.instant('amountSendSucess'));
      this.createSendForm();
      this.saveTransaction('ETH', address, value, result);
      this.show(result);
    }, error=> {
      this.sharedService.setLoader(false);
      this.toastr.error(this.translateService.instant('amountSendFail'));
      //console.log(error);
    });
  }

  changeCurrency(value, amountField?) {
    if (amountField) {
      amountField.value = '';
    }
    this.balance = null;
    if (value == 0) {
      this.totalText = "Total USD : ";
    } else {
      // this.totalText = "Total ETH : ";
    }
  }

  checkAddress(address) {
    if (address == "") {
      return this.isAddressValid = false
    }
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      //check if it has the basic requirements of an address 
      return this.isAddressValid = false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
      //If it's all small caps or all all caps, return true 
      return this.isAddressValid = true;
    }
    else {
      //Otherwise check each case 
      return this.isAddressValid = this.isChecksumAddressValid(address);
    }
  }

  isChecksumAddressValid(address) {
    //Check each case 
    address = address.replace('0x', '');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++) {
      //the nth letter should be uppercase if the nth digit of casemap is 1 
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
        return false;
      }
    }
    return true;
  }

  getEtherPrice() {
    this.apiManager.getLocalAPI(API.ETH_PRICE).subscribe(res=> {
      this.etherPrice = res["ticker"].price;
    }, error=> {

    })
  }

  getGas() {
    this.web3Service.getGasPrice().subscribe(res=> {
      this.gasPrice = res;
      // console.log(res);
    }, error=> {

    })
  }

  updatePrice(currency, isValid, value) {
    if (isValid && value) {
      if (currency == "0") {
        this.balance = (this.etherPrice * parseFloat(value)).toFixed(5);
        // console.log(this.gasPrice * 198806);
        this.transactionFee = this.web3Service.weiToEtherConvert(this.gasPrice * 198806) + " Eth";
      } else {
        // this.balance = (parseFloat(value) / this.etherPrice).toFixed(5);
        this.balance = null;
      }
    } else {
      this.balance = null;
    }
  }

  transferToken(address, value, password) {
    this.sharedService.setLoader(true);
    try {
      password.password = this.sharedService.getPrivateKey(password.password);
    } catch (e) {
      this.sharedService.setLoader(false);
      this.toastr.error(this.translateService.instant('invalidPwd'));
      return
    }
    var gasObj = {
      to: address,
      from: this.sharedService.getWalletAddress.address,
      data: value,
      password: password.password,
      contract: TokenContract.CONTRACT_ADDRESS
    };

    this.web3Service.signedTransaction(gasObj).subscribe(result=> {
      this.sharedService.setLoader(false);
      this.toastr.success(this.translateService.instant('tokenTransferSuccess'));
      this.createSendForm();
      this.saveTransaction('SYM', address, value, result);
      this.show(result);
      // var that = this;
      // setTimeout(() => {
      //   that.changeCurrency("0");
      // }, 10000)
    }, error=> {
      this.sharedService.setLoader(false);
      this.toastr.error(this.translateService.instant('tokenTransferfailed'));
      //console.log(error);
    });
  }

  saveTransaction(currency, address, amount, hash) {
    let body = {
      "type": "Output",
      "date": moment().format('HH:mm DD MMM YYYY'),
      "description": "Sent " + amount + " " + currency + " to " + address + " Completed.",
      "status": "Pending",
      "amount": -Math.abs(amount) + " " + currency,
      "transactionHash": hash
    };
    this.apiManager.postAPI(API.TRANSACTION, body).subscribe(response => {

    });
  }

  show(hash) {
    this.isShowModal = 1;
    this.msgs.push({
      severity: 'success',
      summary: '',
      detail: this.translateService.instant('transactionMsg')
    });
    this.msgs.push({
      severity: 'success',
      summary: this.translateService.instant('transactionHash'),
      detail: '<a class="hasMsg" href="https://etherscan.io/tx/' + hash + '" target="_blank">' + hash + '</a>'
    });
  }

  hide() {
    this.msgs = [];
  }

  checkAccountBalance(account) {
    this.web3Service.getEtherAccountBalance(account).subscribe(result=> {
      this.etherBalance = result;

    }, error=> {
      // this.etherBalance = error;

      //console.log(error);
    });
  }

  checkProofAccountBalance(account) {
    this.web3Service.getTokenBalance(account).subscribe(result=> {
      this.tokenBalance = result;
    }, error=> {
      // this.tokenBalance = error;

      //console.log(error);
    });
  }


  onVerifyPassword(value, formParam) {
    // console.log(value,formParam);
    if (formParam.currency == "0") {
      this.sendBalance(formParam.destination, formParam.amount, value);
    } else {
      this.transferToken(formParam.destination, formParam.amount, value);
    }
  }

  closeForm() {
    this.isShowModal = 1;
  }

  getTime() {
    // this.checkTime = true;
    this.web3Service.getCurrentTimeStamp().subscribe(response => {
      var currentTimestamp = new Date(response[0] * 1000);
      this.checkTime = currentTimestamp.getTime() < 1512086400000;
    }, err=> {
      // this.getTime();
    });
  }

}
