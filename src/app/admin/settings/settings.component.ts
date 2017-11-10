import {Component, HostListener, OnInit, ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import {BaseComponent} from "../../utility/base-component/base.component";
import {ToastsManager} from "ng2-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonRegexp} from "../../utility/constants/validations";
import {CommonFunctions} from "../../utility/common-functions";
import {APIManager} from "../../utility/shared-service/apimanager.service";
import {SharedService} from "../../utility/shared-service/shared.service";
import {User} from "../../utility/shared-model/shared-user.model";
import {Wallet} from "../../utility/shared-model/wallet.model";
import {API} from "../../utility/constants/api";
import {style, transition, animate, trigger} from "@angular/animations";
import {slideUp} from "../animation";
import {TranslateService} from "../../utility/translate/translate.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
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
    slideUp
  ]
})
export class SettingsComponent extends BaseComponent implements OnInit {
  isShowModal: number = 1;
  commonFunctions = new CommonFunctions();
  changePasswordForm: FormGroup;
  importWalletForm: FormGroup;
  phoneNumberForm: FormGroup;
  passwordForm: FormGroup;

  walletText: string;
  status:string;
  fileName:string = "Choose file";
  countryCodeValue: string = '44';

  user: User;
  wallet: Wallet;

  checked: boolean;

  constructor(public fb: FormBuilder,
              private  translateService: TranslateService,
              public vcr: ViewContainerRef, private toastManager: ToastsManager, private apiManager: APIManager, private sharedService: SharedService) {
    super(toastManager, vcr);
  }

  ngOnInit() {
    this.user = this.sharedService.getUser();
    this.wallet = this.sharedService.getWalletAddress;
    this.createChangePassword();
    this.createImportWalletForm();
    this.createPhoneNumberForm();
    this.createPasswordForm();
    this.checked = this.user.is2FAOn;
    //console.log(this.user);
  }

  createChangePassword() {
    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl(''),
      newPassword: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(50), Validators.pattern(CommonRegexp.PASSWORD_REGEXP)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.minLength(8), Validators.maxLength(50), Validators.pattern(CommonRegexp.PASSWORD_REGEXP)])),
    }, {validator: this.validPassword});
  }

  validPassword(fg: FormGroup) {
    let newPasswordValue = fg.value["newPassword"]
    let confirmPasswordValue = fg.value["confirmPassword"]
    let valid = true;
    if (newPasswordValue != "" && (newPasswordValue !== confirmPasswordValue)) {
      valid = false;
    }
    return valid ? null : {'repeatPassword': true};
  }

  createImportWalletForm(){
    this.importWalletForm = this.fb.group({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
    })
  }

  createPhoneNumberForm(){
    this.phoneNumberForm = this.fb.group({
      countryCode: new FormControl('',[<any>Validators.pattern(CommonRegexp.NUMERIC_REGEXP)]),
      telephoneNumber: new FormControl('',[<any>Validators.pattern(CommonRegexp.NUMERIC_REGEXP)])
    })
  }

  changePhoneNumber(number) {
    var body = {
      "telephoneNumber": '+'+this.countryCodeValue + number
    }
    this.apiManager.putAPI(API.UPDATE_USER_DETAIL, body).subscribe(response=> {
      this.isShowModal = 1;
      this.sharedService.setUser(response.payload.data);
    });
  }

  createPasswordForm(){
    this.passwordForm = this.fb.group({
      password: new FormControl(''),
    })
  }

  onVerifyPassword(value){
    // "password": this.commonFunctions.encryptPassword(this.sharedService.getPass()).toString(),
    var body = {
      "password": this.commonFunctions.encryptPassword(value.password).toString(),
      "status": this.status
    };
    this.apiManager.putAPI(API.UPDATE_SECURE_LOGIN, body).subscribe(response=> {
      this.isShowModal = 1;
    });
  }

  change2FA(status) {
    this.createPasswordForm();
    this.isShowModal = 5;
    this.status = status.toString();
  }

  closeForm(){
    this.checked = this.user.is2FAOn;
    this.isShowModal = 1;
  }
  changePasswordORImportWallet(oldPass: string, newPass: string, status: boolean) {
    //console.log(oldPass,newPass,status)
    this.sharedService.setLoader(true);
    var container;
    if (status)
      container = this.commonFunctions.generateEthereumWallet(newPass);
    else {
      try{
        this.commonFunctions.privateKeyReturn(newPass,this.walletText)
      }catch (e){
        //console.log(e);
        //console.log(e);
        this.sharedService.setLoader(false);
        this.toastManager.error(this.translateService.instant('invalidOldPwd'));
        return
      }
      container = this.walletText;
    }
    var encryptContainer = this.commonFunctions.encryptObject(newPass, container).toString();
    var pass = newPass;
    newPass = this.commonFunctions.encryptPassword(newPass).toString();
    var body = {
      "oldPassword": this.commonFunctions.encryptPassword(oldPass).toString(),
      "newPassword": newPass,
      "status" : status.toString(),
      "encryptContainer": encryptContainer
    }
    this.apiManager.putAPI(API.UPDATE_USER_DETAIL, body).subscribe(response=> {
      this.sharedService.setLoader(false);
      this.sharedService.setPass(pass);
      this.createChangePassword();
      this.createImportWalletForm();
      this.sharedService.setUser(response.payload.data);
      this.sharedService.setWalletAddress();
      this.isShowModal = 1;
    },error=>{
      this.sharedService.setLoader(false);
    });
  }

  public selectFile(value) {
    this.commonFunctions.readThis(value).subscribe(result=> {
      try {
        this.walletText = JSON.parse(result);
        let file = value.files[0];
        this.fileName = file.name;
        //console.log(this.walletText);
      } catch (e) {
        this.toastManager.error(this.translateService.instant('invalidFile'));
      }
    });
  }


  onShowPhoneNumberModal() {
    this.createPhoneNumberForm();
    this.isShowModal = 2;
  }

  onChangePassword() {
    this.createChangePassword();
    this.isShowModal = 3;
  }

  onImportWallet() {
    this.createImportWalletForm();
    this.isShowModal = 4;
  }

  onCountryChangeEvent(countryCode){
    this.countryCodeValue = countryCode;
  }

  //Esc event
  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
      this.isShowModal = 1;
      this.checked = this.user.is2FAOn;
    }
  }
}
