import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../utility/base-component/base.component";
import {ToastsManager} from "ng2-toastr";
import {CommonRegexp} from "../../utility/constants/validations";
import {slideDown, slideUp} from "../animation";
import {API} from "../../utility/constants/api";
import {APIManager} from "../../utility/shared-service/apimanager.service";
import * as sha3 from 'crypto-js/sha3';
import {style, transition, animate, trigger} from "@angular/animations";
import {BaseUrl} from "../../utility/constants/base-constants";

@Component({
  selector: 'app-referral-program',
  templateUrl: './referral-program.component.html',
  styleUrls: ['./referral-program.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.8, .8, .8)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ]),
    slideUp, slideDown
  ]
})
export class ReferralProgramComponent extends BaseComponent implements OnInit {

  referralCodeForm: FormGroup;
  referralCode: string
  isAddressValid: boolean = true;
  isShowModal: number = 1;

  constructor(private fb: FormBuilder,
              private apiManager: APIManager,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef) {
    super(toastr, vcr);
  }

  ngOnInit() {
    this.createReferralCodeForm();
  }

  createReferralCodeForm() {
    this.referralCodeForm = this.fb.group({
      email: new FormControl('', [<any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP)]),
      ethereumAddress: new FormControl('')
    });
  }

  onReferralCodeSubmit(formParams, isValid) {
    if (isValid && this.isAddressValid) {
      // console.log("Values :=>", formParams);
      this.apiManager.postAPI(API.REFERRALS, formParams).subscribe(response => {
        this.createReferralCodeForm();
        this.isShowModal = 2;
        this.referralCode = response.payload.data;
      });
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

  get mainUrl() {
    return BaseUrl.MAIN_URL;
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


}
