import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../utility/shared-service/shared.service";
import {APIManager} from "../../utility/shared-service/apimanager.service";
import {slideDown, slideUp} from "../animation";
import {API} from "../../utility/constants/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonRegexp} from "../../utility/constants/validations";

@Component({
  selector: 'app-referral-status',
  templateUrl: './referral-status.component.html',
  styleUrls: ['./referral-status.component.css'],
  animations: [slideUp, slideDown]
})
export class ReferralStatusComponent implements OnInit {

  referalList: any[] = [];
  searchEmail: FormGroup;

  constructor(private sharedService: SharedService,
              private apiManager: APIManager,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.getReferalsList('');
    this.createSearchEmail();
  }

  createSearchEmail() {
    this.searchEmail = this.fb.group({
      email: new FormControl('', [<any>Validators.required, <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP)])
    });
  }

  getReferalsList(emailValue) {
    // console.log(emailValue);
    let queryParams = {
      "records": "all"
    }
    let search = {};
    if (emailValue)
      search['email'] = emailValue
    else
      this.createSearchEmail();

    this.apiManager.getAPI(API.Referrals, queryParams, search).subscribe(response => {
      this.referalList = response.payload.data;
    });
  }

}
