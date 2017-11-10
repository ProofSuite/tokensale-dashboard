import {Base64} from "./base64-typescript-class";
import {Observable} from "rxjs";
// var keythereum = require("keythereum");
// var CryptoJS = require("crypto-js");
//var sha3 = require("crypto-js/sha3");
import * as keythereum from 'keythereum';
import * as CryptoJS from 'crypto-js';
import * as sha3 from 'crypto-js/sha3';
export class CommonFunctions {

  public options = {
    kdf: "pbkdf2",
    cipher: "aes-128-ctr",
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: "hmac-sha256"
    }
  };

  public params = {keyBytes: 32, ivBytes: 16};

  public generateEthereumWallet(password: any): any {
    var dk = keythereum.create(this.params);
    return keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, this.options);
  }

  public privateKeyReturn(password, keyObject) {
    return keythereum.recover(password, keyObject).toString('hex');
  }

  //noinspection JSAnnotator
  public readThis(inputValue: any): Observable<string> {
    var file: File = inputValue.files[0];
    return new Observable(obs => {
      try {
        var myReader: FileReader = new FileReader();
        myReader.onload = (e)=> {
          obs.next(myReader.result);
          obs.complete();
        }
        myReader.readAsText(file);
      } catch (e) {
        obs.error(e);
      }
    });
  }

  public encryptObject(password, data) {
    // data = util.inspect(data);
    return CryptoJS.AES.encrypt(JSON.stringify(data, null, 3), password);
  }

  public decryptObject(password, ciphertext) {
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), password);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  public encryptPassword(password) {
    return CryptoJS.MD5(CryptoJS.SHA256(CryptoJS.MD5(password)));
  }

  public static ENCRYPT_OBJ(value: any): any {
    let base64 = new Base64();
    return base64.encode(JSON.stringify(value));
  }

  public static DECRYPT_OBJ(value: any): any {
    if (value && value != null) {
      let base64 = new Base64();
      return JSON.parse(base64.decode(value));
    }
    return '';
  }

  public static ConvertIntToBoolean(value): boolean {
    if (value == null)
      return false;
    if (value == 1) {
      return true;
    } else {
      return false;
    }
  }

  public static Logger(value1, value2?) {}

  public static isValidString(stringVal): boolean {
    let valid: boolean = false;
    if (stringVal && stringVal != "null" && stringVal != null && stringVal != "undefined") {
      valid = true
    }
    return valid;
  }
}

export function FileIsImage(filename: string): boolean {
  return (filename === 'image/png' || filename === 'image/jpeg' || filename === 'image/jpg' || filename === 'image/svg+xml');
}
