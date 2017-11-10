import {Component, HostListener, OnInit, ViewContainerRef} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {CommonRegexp} from "../../utility/constants/validations";
import {BaseComponent} from "../../utility/base-component/base.component";
import {RouteConstants} from "../../utility/constants/routes";
import {UserAuthService} from "../user-auth.service";
import {SharedService} from "../../utility/shared-service/shared.service";
import {APIManager} from "../../utility/shared-service/apimanager.service";
import {API} from "../../utility/constants/api";
declare var particlesJS: any;
import {CommonFunctions} from "../../utility/common-functions";
import {animate, style, transition, trigger} from "@angular/animations";
import {Web3Service} from "../../utility/shared-service/web3.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.8, .8, .8)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  otpForm: FormGroup;

  activeForm: number = 1;
  userId: string;
  userEmail: string;
  commonFunctions = new CommonFunctions();

  constructor(private web3Service: Web3Service, public toastr: ToastsManager,
              public vcr: ViewContainerRef,
              private userAuthService: UserAuthService,
              private sharedService: SharedService,
              private router: Router,
              private apiManager: APIManager,
              private formBuilder: FormBuilder) {
    super(toastr, vcr);
  }

  ngOnInit() {
    this.sharedService.trackMixPanelEvent("visit login");
    this.createLoginForm();
    this.createOtpForm();
    particlesJS.load('login-particles-js', 'assets/js/particles.json', function () {});
  }

  // Initialize form elements with validations and Methods
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP)])),
      password: new FormControl('')
    });
  }

  // Login form submit method
  onLogin(formParams, isValidForm) {
    if (isValidForm) {
      this.sharedService.setPass(formParams.password);
      formParams.password = this.commonFunctions.encryptPassword(formParams.password).toString();
      this.apiManager.postAPI(API.Login, formParams).subscribe(response=> {
        if (response.payload.data.token) {
          this.sharedService.setUser(response.payload.data.user);
          this.checkProofAccountBalance("0x" + this.sharedService.getWalletAddress.address,response);
        } else {
          this.activeForm = 2;
          this.userId = response.payload.data.userId;
          this.userEmail = formParams.email;
        }
      });
    }
  }

  // Initialize form elements with validations and Methods
  createOtpForm() {
    this.otpForm = this.formBuilder.group({
      OTP: new FormControl('', Validators.compose([Validators.pattern(CommonRegexp.NUMERIC_REGEXP), Validators.minLength(6), Validators.maxLength(6)])),
      user: new FormControl(''),
      email: new FormControl('')
    });
  }

  // Otp form submit method
  onOtpSubmit(formValue, isValidForm) {
    if (isValidForm) {
      // console.log("OTP is :", formValue);
      formValue["user"] = this.userId;
      formValue["email"] = this.userEmail;
      this.apiManager.postAPI(API.VERIFY_OTP, formValue).subscribe(response=> {
        // console.log(response);
        this.sharedService.setToken(response.payload.data.token);
        this.sharedService.setUser(response.payload.data.user);
        this.router.navigate(["/" + RouteConstants.TRANSACTION_HISTORY]);
        this.router.navigate(["/" + RouteConstants.GET_ETHERIUM]);
      });
    }
  }

  resendOtp() {
    let params = {
      userId: this.userId,
      email: this.userEmail
    }
    this.apiManager.putAPI(API.RESEND_OTP, params).subscribe(response=> {
    });
  }

  viewRegisterForm() {
    this.router.navigate(["/" + RouteConstants.REGISTERATION]);
  }

  checkProofAccountBalance(account,response) {
    this.sharedService.setLoader(true);
    this.web3Service.getTokenBalance(account).subscribe(result=> {
      this.sharedService.setLoader(false);
      this.sharedService.setToken(response.payload.data.token);
      if (result == "0.00000") {
        this.router.navigate(["/" + RouteConstants.GET_ETHERIUM]);
      } else
        this.router.navigate(["/" + RouteConstants.TRANSACTION_HISTORY]);
    }, error=> {
      this.sharedService.setLoader(false);
      this.router.navigate(["/" + RouteConstants.GET_ETHERIUM]);
    });
  }

}
