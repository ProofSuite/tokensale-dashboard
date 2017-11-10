import {Injectable} from '@angular/core';
import {APIManager} from './apimanager.service';
import {Country} from './shared-model';
import {API} from '../constants/api';

@Injectable()
export class SharedObjService {

  private _countryList: Country[] = [];

  constructor(private apiManager: APIManager) {
  }

  getConfigParams() {
    const params = {"records": "all"};
    this.apiManager.getAPI(API.COUNTRY, params).subscribe(response => {
      this.setCountryList(response.payload.data);
    });
  }

  getCountryList(): Country[] {
    return this._countryList;
  }

  setCountryList(value: Country[]) {
    this._countryList = value;
  }
}
