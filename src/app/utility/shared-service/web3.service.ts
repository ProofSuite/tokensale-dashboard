import {Injectable} from "@angular/core";
import {BaseUrl, Contract, TokenContract} from "../constants/base-constants";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {SharedService} from "./shared.service";
import * as Web3 from 'web3';
import * as Tx from 'ethereumjs-tx';
// var Tx = require('ethereumjs-tx');

@Injectable()
export class Web3Service {

  constructor(private sharedService: SharedService) {
    this.getWeb();
  }

  private web3;
  private contractObj;
  private tokenObj;

  public getWeb(): any {
    return this.setWeb3Provider();
  }

  private setWeb3Provider(): any {
    if (typeof this.web3 !== 'undefined') {
      return new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(BaseUrl.MAIN_NET_WEB3));
      // this.web3.eth.net.isListening().then(console.log);
      this.contractObj = new this.web3.eth.Contract(Contract.CONTRACT_ABI, Contract.CONTRACT_ADDRESS);
      this.tokenObj = new this.web3.eth.Contract(TokenContract.CONTRACT_ABI, TokenContract.CONTRACT_ADDRESS);
      return this.web3;
    }
  }

  weiToEtherConvert(value): number {
    return this.web3.utils.fromWei(value, 'ether');
  }

  getEtherAccountBalance(address): Observable<string> {
    return new Observable(obs => {
      this.web3.eth.getBalance(address).then(wieBalance=> {
        try {
          if (!wieBalance) {
            obs.error('0');
          } else {
            var balance = this.web3.utils.fromWei(wieBalance, 'ether');
            if (balance) {
              obs.next(Number(balance).toFixed(5));
              obs.complete();
            } else {
              obs.error('0');
            }
          }
        } catch (e) {
          obs.error('0');
        }
      }, err=> {
        obs.error('0');
      });
    });
  }

  getTokenBalance(address): Observable<string> {
    return new Observable(obs => {
      // console.log(address);
      Observable.forkJoin(
        Observable.fromPromise(this.contractObj.methods.balanceOf(address).call()),
      ).subscribe(res => {
        try {
          if (!res) {
            obs.error('0');
          } else {
            var balance = this.web3.utils.fromWei(res[0], 'ether');
            obs.next(Number(balance).toFixed(5));
            obs.complete();
          }
        } catch (e) {
          obs.error('0');
        }
      }, err=> {
        obs.error('0');
      });
    });
  }

  getGasPrice(): Observable<number> {
    return new Observable(obs => {
      Observable.forkJoin(
        Observable.fromPromise(this.web3.eth.getGasPrice()),
      ).subscribe(res => {
        try {
          if (!res) {
            obs.error('0');
          } else {
            obs.next(res[0]);
            obs.complete();
          }
        } catch (e) {
          obs.error('0');
        }
      }, err=> {
        obs.error('0');
      });
    });
  }


  signedTransaction(gasObj): Observable<string> {
    if (gasObj.value) {
      gasObj.value = this.web3.utils.toWei(gasObj.value, "ether");
    } else {
      // gasObj.value = this.web3.utils.toWei(gasObj.data, "ether");
      var callData = this.tokenObj.methods.transfer(gasObj.to, this.web3.utils.toWei(gasObj.data, "ether")).encodeABI();
      gasObj.data = callData;
      //console.log(gasObj);
    }

    return new Observable(obs => {
      Observable.forkJoin(
        Observable.fromPromise(this.web3.eth.getTransactionCount(gasObj.from)),
        Observable.fromPromise(this.web3.eth.getGasPrice()),
        Observable.fromPromise(this.web3.eth.estimateGas(gasObj))
      ).subscribe(res => {
        try {
          var tx;
          if (gasObj.data) {
            tx = new Tx({
              to: gasObj.contract,
              nonce: res[0],
              gasLimit: this.web3.utils.toHex(200000),
              gasPrice: this.web3.utils.toHex(res[1]),
              data: gasObj.data,
              value: gasObj.value ? this.web3.utils.toHex(gasObj.value) : this.web3.utils.toHex(0)
            });
          } else {
            tx = new Tx({
              to: gasObj.to,
              nonce: res[0],
              gasLimit: this.web3.utils.toHex(res[2]),
              gasPrice: this.web3.utils.toHex(res[1]),
              value: this.web3.utils.toHex(gasObj.value)
            });
          }
          // console.log(gasObj.password);
          tx.sign(new Buffer(gasObj.password, 'hex'));
          this.web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function (err, response) {
            if (err) {
              obs.error(err);
            } else {
              obs.next(response);
              obs.complete();
            }
          });
        } catch (e) {
          obs.error(e);
        }
        // return null;
      }, error=> {
        obs.error(error);
      });
    });
  }

  getTransactionStatus(transactionHash, id): Observable<any> {
    return new Observable(obs => {
      if (!transactionHash)
        obs.error(false);
      this.web3.eth.getTransactionReceipt(transactionHash).then(receipt=> {
        try {
          if (!receipt) {
            obs.error(false);
          } else {
            if (receipt.blockNumber) {
              obs.next(id);
              obs.complete();
            } else {
              obs.error(false);
            }
          }
        } catch (e) {
          obs.error(false);
        }
      }, err=> {
        obs.error(false);
      });
    });
  }

  getCurrentTimeStamp(): Observable<any> {
    return new Observable(obs => {
      Observable.forkJoin(
        Observable.fromPromise(this.web3.eth.getBlockNumber()),
        Observable.fromPromise(this.contractObj.methods.totalWeiRaised().call())
      ).subscribe(res => {
        this.web3.eth.getBlock(res[0]).then(receipt=> {
          try {
            if (receipt) {
              var result = [receipt.timestamp, Number(res[1])];
              obs.next(result);
              obs.complete();
            } else {
              obs.error(false);
            }
          } catch (e) {
            obs.error(false);
          }
        });
      }, err=> {
        obs.error(false);
      });

      // this.web3.eth.getBlockNumber().then(blockNumber=> {
      //   this.web3.eth.getBlock(blockNumber).then(receipt=> {
      //     if (receipt) {
      //       obs.next(receipt.timestamp);
      //       obs.complete();
      //     } else {
      //       obs.error(false);
      //     }
      //   });
      // });
    });
  }

} 
