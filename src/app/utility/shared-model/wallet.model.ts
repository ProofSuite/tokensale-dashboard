export class Wallet {
  private _address: string;
  private id: string;
  private version: string;
  private crypto: Crypto;

  get address(): string {
    return this._address;
  }
}

class Crypto {
  private cipher: string;
  private ciphertext: string;
  private cipherparams: Cipherparams;
  private mac: string;
  private kdf: string;
  private kdfparams: Kdfparams;
}
class Cipherparams {
  private iv: string;

}

class Kdfparams {
  private c: string;
  private dklen: string;
  private prf: string;
  private salt: string;
}
