import {dialog, slideUp} from "../../animation";
import {SharedService} from "../../../utility/shared-service/shared.service";
import {Web3Service} from "../../../utility/shared-service/web3.service";
import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {BaseComponent} from "../../../utility/base-component/base.component";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {CommonRegexp} from "../../../utility/constants/validations";
import {Contract} from "../../../utility/constants/base-constants";
import {TranslateService} from "../../../utility/translate/translate.service";
import {API} from "../../../utility/constants/api";
import * as moment from 'moment';
import {APIManager} from "../../../utility/shared-service/apimanager.service";
import {Message} from "primeng/primeng";

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.css'],
  animations: [slideUp, dialog]
})
export class BuyTokensComponent extends BaseComponent implements OnInit, OnDestroy {

  buyTokenForm: FormGroup;
  passwordForm: FormGroup;
  checkTime: boolean;
  loader: boolean = true;
  isShowModal: number = 1;
  balance: any;
  tokenCount: any;
  address: string = "";
  etherBalance: string = "0";
  tokenBalance: string = "0";
  timerInterval;
  seconds;
  days;
  hours;
  minutes;
  totalWeiRaised: number;
  msgs: Message[] = [];

  constructor(private sharedService: SharedService, private fb: FormBuilder,
              private web3Service: Web3Service,
              public toastr: ToastsManager,
              private apiManager: APIManager,
              public vcr: ViewContainerRef,
              public translateService: TranslateService) {
    super(toastr, vcr);
  }

  ngOnInit() {
    this.getTime();
  }

  getTime() {
    this.sharedService.setLoader(true);
    this.web3Service.getCurrentTimeStamp().subscribe(response => {
      this.totalWeiRaised = response[1];
      this.sharedService.setLoader(false);
      var currentTimestamp = new Date(response[0] * 1000);
      this.checkTime = currentTimestamp.getTime() < 1509494400000;
      // this.checkTime = false;
      this.loader = false;
      if (this.checkTime)
        this.getEvent(1509494400000);
      else {
        this.createBuyTokenForm();
        this.createPasswordForm();
        this.address = "0x" + this.sharedService.getWalletAddress.address;
        this.checkAccountBalance(this.address);
        this.checkProofAccountBalance(this.address);
      }
    }, err=> {
      // this.getTime();
    });
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      password: new FormControl('')
    })
  }

  createBuyTokenForm() {
    this.buyTokenForm = this.fb.group({
      ether: new FormControl('', [<any>Validators.pattern(CommonRegexp.NUMERIC_FLOAT_REGEXP)]),
      tokenType: new FormControl('0')
    }, {validator: this.validBalanceAmount.bind(this)})
  }

  validBalanceAmount(fg: FormGroup) {
    let amount = fg.value["ether"]
    let currency = fg.value["tokenType"]
    let valid = true;
    let errorType = "";
    // if (currency == "0") {
    if (+this.etherBalance <= +amount) {
      valid = false;
      errorType = "invalidEtherBalance";
    }
    // } else {
    //   if (+this.tokenBalance <= +amount) {
    //     valid = false;
    //     errorType = "invalidtokenBalance";
    //   }
    // }
    //console.log(errorType);
    return valid ? null : {[errorType]: true};
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

  onSubmitBuyToken(value) {
    this.createPasswordForm();
    this.isShowModal = 2;
  }

  buyToken(value) {
    this.sharedService.setLoader(true);
    var gasObj = {
      from: this.sharedService.getWalletAddress.address,
      to: Contract.CONTRACT_ADDRESS,
      value: value
    };
    this.web3Service.signedTransaction(gasObj).subscribe(result=> {
      //console.log(result);
      this.sharedService.setLoader(false);
      this.toastr.success(this.translateService.instant('PRTFBoughtSuccess'));
      this.createBuyTokenForm();
    }, error=> {
      this.sharedService.setLoader(false);
      this.toastr.error(this.translateService.instant('PRTFBoughtFailed'));
      //console.log(error);
    });
  }

  distributionCalculation(type, isValid, etherToken) {
    if (isValid && etherToken) {
      let firstCheckpoint = 0.05 * Contract.WEI_CAP;
      let secondCheckpoint = 0.10 * Contract.WEI_CAP;
      let thirdCheckpoint = 0.20 * Contract.WEI_CAP;
      let bonus = 0;
      if (this.totalWeiRaised < firstCheckpoint) {
        bonus = 0.15
      } else if (this.totalWeiRaised < secondCheckpoint) {
        bonus = 0.10;
      } else if (this.totalWeiRaised < thirdCheckpoint) {
        bonus = 0.5;
      } else {
        bonus = 0;
      }
      if (type == 1) {//Ether Count
        let paidToken = etherToken - (etherToken * bonus)
        var ether = paidToken * Contract.TOKEN_PRICE;
        return this.balance = Number(ether).toFixed(5) + ' ETH';
      } else {//Token Count
        this.tokenCount = this.getTokensWithBonus(bonus, etherToken).toFixed(3);
        return this.balance = this.tokenCount + ' SYM';
      }
    } else {
      return this.balance = '';
    }
  }

  getTokensWithBonus(bonus, totalEther) {
    var token = totalEther / Contract.TOKEN_PRICE;
    var bonusToken = token * bonus;
    return token + bonusToken;
  }

  buyProofToken(pass, value) {
    this.sharedService.setLoader(true);
    try {
      pass.password = this.sharedService.getPrivateKey(pass.password);
    } catch (e) {
      this.sharedService.setLoader(false);
      this.toastr.error(this.translateService.instant('invalidPwd'));
      return
    }
    var gasObj = {
      to: Contract.CONTRACT_ADDRESS,
      from: this.sharedService.getWalletAddress.address,
      value: value,
      password: pass.password
    };
    this.web3Service.signedTransaction(gasObj).subscribe(result=> {
      this.sharedService.setLoader(false);
      this.toastr.success(this.translateService.instant('PRTFBoughtSuccess'));
      this.saveTransaction(this.balance, value, result);
      this.show(result);
      // var that = this;
      // setTimeout(() => {
      //   that.changeCurrency("0");
      // }, 10000)
    }, error=> {
      this.sharedService.setLoader(false);
      this.toastr.error(this.translateService.instant('PRTFBoughtFailed'));
      //console.log(error);
    });
  }

  saveTransaction(token, amount, hash) {
    let body = {
      "type": "Input",
      "date": moment().format('HH:mm DD MMM YYYY'),
      "description": "Converted " + amount + " ETH to " + this.tokenCount + " SYM Completed.",
      "status": "Pending",
      "amount": "+" + this.tokenCount + " SYM",
      "transactionHash": hash
    };
    this.apiManager.postAPI(API.TRANSACTION, body).subscribe(response => {

    });
  }

  changeCurrency(value, amountField?) {
    if (amountField) {
      amountField.value = '';
    }
    this.balance = null;
    if (value == 0) {
      // this.totalText = "Total USD : ";
    } else {
      // this.totalText = "Total ETH : ";
    }
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

  onVerifyPassword(pass, value) {
    this.buyProofToken(pass, value.ether);
  }

  getEvent(time) {
    let currentTime = new Date();
    let endTime = new Date()
    endTime.setTime(time);
    let startTime = new Date();
    if (currentTime.getTime() >= startTime.getTime() && (currentTime.getTime() < endTime.getTime())) {
      this.countDownTimer(endTime, currentTime);
    }
  }

  // Update the count down every 1 second
  countDownTimer(endDateTime, currentDateTime) {
    let self = this;
    this.timerInterval = setInterval(function () {
      // Find the distance between now an the count down date
      currentDateTime.setSeconds(currentDateTime.getSeconds() + 1);
      let distance = endDateTime.getTime() - currentDateTime.getTime();

      if (distance != NaN && distance > 0) {
        // Time calculations for days, hours, minutes and seconds
        self.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        self.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        self.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        self.seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("daysPr")) {
          document.getElementById("daysPr").setAttribute("data", self.days);
          document.getElementById("hoursPr").setAttribute("data", self.hours);
          document.getElementById("minutesPr").setAttribute("data", self.minutes);
          document.getElementById("secondsPr").setAttribute("data", self.seconds);
        } else {
          if (this.timerInterval) {
            clearInterval(this.timerInterval)
          }
        }
      }
      else {
        self.days = " -- ";
        self.hours = " -- ";
        self.minutes = " -- ";
        self.seconds = " -- ";
      }
      // If the count down is over, write some text
      if (distance < 0) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval)
        }
        ;
        self.days = " -- ";
        self.hours = " -- ";
        self.minutes = " -- ";
        self.seconds = " -- ";
      }
    }, 1000);
  }


  closeForm() {
    this.isShowModal = 1;
  }

  get contractAddress() {
    return Contract.CONTRACT_ADDRESS;
  }
}
