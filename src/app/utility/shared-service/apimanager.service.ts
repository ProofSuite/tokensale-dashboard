import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ToastsManager} from "ng2-toastr";
import {Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {HttpService} from "../http-service";
import {SharedService} from "./shared.service";

@Injectable()
export class APIManager {

  constructor(private sharedService: SharedService, private httpService: HttpService, private toastManager: ToastsManager) {
  }

  getAPI(endPoint, queryParams?,searchParams?) {
    queryParams ? "" : queryParams = {};
    (searchParams) ? queryParams["search"] = JSON.stringify(searchParams) : "";
    let params = new URLSearchParams();
    for (let key in queryParams) {
      params.set(key, queryParams[key])
    }
    return this.httpService.get(endPoint + "?" + params.toString()).map(res => this.extractData(res, false));
  }

  postAPI(endPoint, params = {}, files?:any[], showToast? ): Observable<any> {
    let canShowToast =  (showToast != null ? showToast : true)
    if (files == null) {
      return this.httpService.post(endPoint, params).map(res => this.extractData(res, canShowToast));
    } else {
      return this.httpService.postWithFile(endPoint, params, files).map(res => this.extractData(res,canShowToast));
    }
  }

  putAPI(endPoint, params, files?:any[], showToast? ): Observable<any> {
    if (files == null) {
      return this.httpService.put(endPoint, params).map(res => this.extractData(res, true));
    } else {
      return this.httpService.putWithFile(endPoint, params, files).map(res => this.extractData(res, true));
    }
  }

  deleteAPI(endPoint, params?) {
    let queryString = params ? '?' : '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryString += key + '=' + params[key] + '&';
      }
    }
    return this.httpService.delete(endPoint+''+queryString).map(res => this.extractData(res, true));
  }

  getLocalAPI(endPoint) {
    return this.httpService.getLocal(endPoint).map(res => this.extractData(res, false));
  }

  postLocalAPI(endPoint,params) {
    return this.httpService.postLocal(endPoint,params).map(res => this.extractData(res, true));
  }

  patchAPI(apiEndpoint: string, params: any): Observable<any> {
    let token = this.sharedService.getToken()

    let headers = new Headers({'Authorization': `${token}`});
    headers.append("Content-Type", 'application/x-www-form-urlencoded');

    let requestOptions = new RequestOptions({
      headers: headers
    });

    var body = new URLSearchParams();
    body.append(params['key'], params['value']);

    return this.httpService
      .patch(apiEndpoint, body.toString(), requestOptions)
      .map(res => this.extractData(res, true));
  }

  downloadFile(apiEndpoint: string, params: any): Observable<Blob> {
    return this.httpService.postWithDownloadFile(apiEndpoint, params).map(res => res.blob()).catch(res =>{
      return Observable.of(null);
    });
  }

  downloadFileGet(apiEndpoint: string, params?: any): Observable<Blob> {
    return this.httpService.getWithDownloadFile(apiEndpoint, params).map(res => res.blob());
  }

  private extractData(res: Response, show?: boolean) {
    let data = res.json();
    let msg = data.message;
    if (show && msg) {
      this.toastManager.success(msg);
    }
    return data || {};
  }
}
