import {Component, HostListener, OnInit, ViewContainerRef} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {CommonRegexp, CommonValidationMessages} from "../../utility/constants/validations";
import {BaseComponent} from "../../utility/base-component/base.component";
import {RouteConstants} from "../../utility/constants/routes";
import {UserAuthService} from "../user-auth.service";
import {SharedService} from "../../utility/shared-service/shared.service";
import {Status} from "../../utility/constants/base-constants";
import {TranslateService} from "../../utility/translate/translate.service";
import {style, transition, animate, trigger} from "@angular/animations";
declare var particlesJS: any;
declare var $: any;
import {APIManager} from "../../utility/shared-service/apimanager.service";
import {API} from "../../utility/constants/api";
import {CommonFunctions} from "../../utility/common-functions";
import {User} from "../../utility/shared-model/shared-user.model";
import {Web3Service} from "../../utility/shared-service/web3.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
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
export class RegisterComponent extends BaseComponent implements OnInit {
  registerForm: FormGroup;
  otpForm: FormGroup;
  termsAndConditionForm: FormGroup;
  registerFormValues: any;
  commonFunctions = new CommonFunctions();
  activeForm: number = 1;
  activeModal: number = 1;
  countryCodeValue: string = '44';
  email: string;
  user: User;
  mixpanel: any;

  constructor(public toastr: ToastsManager,
              public vcr: ViewContainerRef,
              private userAuthService: UserAuthService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute,
              private apiManager: APIManager,
              private formBuilder: FormBuilder,
              public translateService: TranslateService,) {
    super(toastr, vcr);
  }

  ngOnInit() {
    this.sharedService.trackMixPanelEvent("visit registration");
    this.email = this.route.snapshot.queryParams["email"];
    this.createRegisterForm();
    this.createOtpForm();
    this.createTermsAndConditionForm();
    particlesJS.load('register-particles-js', 'assets/js/particles.json', function () {
    });
    setInterval(function () {
      $("#country").countrySelect({
        defaultCountry: "af",
        preferredCountries: ['', '', '']
      });
    }, 100);
  }

  // Initialize form elements with validations and Methods
  createRegisterForm() {
    let refer = this.sharedService.getRefer();
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])),
      email: new FormControl(this.email ? this.email : '', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP)])),
      password: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(50), Validators.pattern(CommonRegexp.PASSWORD_REGEXP)])),
      confirmPassword: new FormControl(''),
      telephoneNumber: new FormControl(''),
      country: new FormControl(''),
      countryCode: new FormControl(''),
      encryptContainer: new FormControl(''),
      ethereumAddress: new FormControl(''),
      referralCode: new FormControl(refer ? refer : '', [<any>Validators.minLength(8), <any>Validators.maxLength(8)])
    }, {validator: this.validPassword});
  }

  validPassword(fg: FormGroup) {
    let newPasswordValue = fg.value["password"]
    let confirmPasswordValue = fg.value["confirmPassword"]
    let valid = true;
    if (newPasswordValue != "" && (newPasswordValue !== confirmPasswordValue)) {
      valid = false;
    }
    return valid ? null : {'repeatPassword': true};
  }

  // Register form submit method
  onRegister(formParam, isValidForm, countryValue) {
    formParam["country"] = countryValue;
    if (countryValue == "United States") {
      this.toastr.error(this.translateService.instant('usNotResidentsParticipateMsg'));
      return false;
    }
    formParam.countryCode = '+' + this.countryCodeValue;
    var mno = formParam.telephoneNumber.substr(0, 2).includes(formParam.countryCode) ? formParam.telephoneNumber : formParam.countryCode + formParam.telephoneNumber;
    formParam["telephoneNumber"] = mno;
    if (isValidForm) {
      this.sharedService.trackMixPanelEvent("When the Checkbox popup after registration");
      // console.log("Regiter form values :=>", formParam);
      this.registerFormValues = formParam;
      this.createTermsAndConditionForm();
      this.activeModal = 2;
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
      this.sharedService.trackMixPanelEvent("Two-factor OTP confirmation;");
      formValue.user = this.user.id;
      formValue.email = this.user.email;
      // console.log("OTP is :", formValue);
      this.apiManager.postAPI(API.VERIFY_OTP, formValue).subscribe(response=> {
        // console.log(response);
        this.sharedService.setToken(response.payload.data.token);
        this.sharedService.setUser(response.payload.data.user);
        this.router.navigate(["/" + RouteConstants.GET_ETHERIUM]);
      });
    }
  }

  resendOtp() {
    let params = {
      userId: this.user.id,
      email: this.user.email
    }
    this.apiManager.putAPI(API.RESEND_OTP, params).subscribe(response=> {
    });
  }

  // Initialize form elements with validations and Methods
  createTermsAndConditionForm() {
    this.termsAndConditionForm = this.formBuilder.group({
      check1: new FormControl(''),
      check2: new FormControl(''),
      check3: new FormControl(''),
      check4: new FormControl(''),
    });
  }

  onTermsAndConditionConfirmSubmit() {
    var container = this.commonFunctions.generateEthereumWallet(this.registerFormValues.password);
    this.registerFormValues.encryptContainer = this.commonFunctions.encryptObject(this.registerFormValues.password, container).toString();
    this.sharedService.setPass(this.registerFormValues.password);
    this.registerFormValues.password = this.commonFunctions.encryptPassword(this.registerFormValues.password).toString();
    this.registerFormValues.confirmPassword = '';
    this.registerFormValues.ethereumAddress = "0x" + container.address;
    // console.log(this.registerFormValues);
    this.sharedService.trackMixPanelEvent("actual sign up");
    this.apiManager.postAPI(API.SIGNUP, this.registerFormValues).subscribe(response=> {
      this.user = response.payload.data;
      this.activeForm = 3;
      this.activeModal = 1;
    }, err=> {
      this.activeForm = 1;
      this.activeModal = 1;
    });
  }

  viewLoginForm() {
    this.router.navigate(["/" + RouteConstants.LOGIN]);
  }

  onCountryChangeEvent(countryCode) {
    this.countryCodeValue = countryCode;
  }

  closeModal() {
    this.activeForm = 1;
    this.createRegisterForm();
  }

  onSelectCountry(value) {
    //console.log("country :",value);
  }

  isOpenModal(val, type) {
    var body = [val, type]
    this.sharedService.setTokenTermModal(body);
  }

  //Esc event
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
      this.activeForm = 1;
    }
  }

  trackEvent(){
    this.sharedService.trackMixPanelEvent("Focus on Email");
  }
}
