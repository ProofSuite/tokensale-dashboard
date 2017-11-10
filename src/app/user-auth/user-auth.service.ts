import {Injectable} from "@angular/core";
import {HttpService} from "../utility/http-service";
import {Observable} from "rxjs";
import {API} from "../utility/constants/api";
import {Response} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";

@Injectable()
export class UserAuthService {

  constructor(private httpService: HttpService,private toastManager: ToastsManager) {
  }

  login(body): Observable<any> {
    return this.httpService.post(API.Login, body)
      .map(res => this.extractData(res, true)).catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  sendOTP(userName) {
    let values = {"email": userName};
    return this.httpService
      .post('', values)
      .map(res => this.extractData(res, true)).catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  verifyUserOTP(email, userOTP) {
    let values = {"email": email, "otp": userOTP};
    return this.httpService
      .post('', values)
      .map(res => this.extractData(res, true)).catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  resetPWD(email, userOTP, newPWD, confirmPWD) {
    let values = {"email": email, "otp": userOTP, "password": newPWD, "repeatPassword": confirmPWD};
    return this.httpService
      .post('', values)
      .map(res => this.extractData(res, true)).catch((error: any) => {
        return Observable.throw(new Error(error.status));
      });

  }

  private extractData(res: Response, showToast: boolean) {
    if (showToast) {
      this.toastManager.success(res.json().message)
    }
    let data = res.json();
    return data || {};
  }

}
