export class Country {
  private _code: number;
  private _currency: string;
  private _deliveryPrice: number;
  public _id: string;
  private _flagImage: string;
  private _isEnable: boolean;
  private _name: string;
  private _countryId: string

  get countryId(): string {
    return this._countryId;
  }

  set countryId(value: string) {
    this._countryId = value;
  }

  get code(): number {
    return this._code;
  }

  set code(value: number) {
    this._code = value;
  }

  get currency(): string {
    return this._currency;
  }

  set currency(value: string) {
    this._currency = value;
  }

  get deliveryPrice(): number {
    return this._deliveryPrice;
  }

  set deliveryPrice(value: number) {
    this._deliveryPrice = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get flagImage(): string {
    return this._flagImage;
  }

  set flagImage(value: string) {
    this._flagImage = value;
  }

  get isEnable(): boolean {
    return this._isEnable;
  }

  set isEnable(value: boolean) {
    this._isEnable = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
