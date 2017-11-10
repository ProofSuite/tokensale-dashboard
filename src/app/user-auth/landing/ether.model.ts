export class Ethereum {
  private _id: string;
  private _name: string;
  private _symbol: string;
  private _rank: string;
  private _price_usd: string;
  private _price_btc: string;
  // private 24h_volume_usd: string;
  private _market_cap_usd: string;
  private _available_supply: string;
  private _total_supply: string;
  private _percent_change_1h: string;
  private _percent_change_24h: string;
  private _percent_change_7d: string;
  private _last_updated: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get symbol(): string {
    return this._symbol;
  }

  set symbol(value: string) {
    this._symbol = value;
  }

  get rank(): string {
    return this._rank;
  }

  set rank(value: string) {
    this._rank = value;
  }

  get price_usd(): string {
    return this._price_usd;
  }

  set price_usd(value: string) {
    this._price_usd = value;
  }

  get price_btc(): string {
    return this._price_btc;
  }

  set price_btc(value: string) {
    this._price_btc = value;
  }

  get market_cap_usd(): string {
    return this._market_cap_usd;
  }

  set market_cap_usd(value: string) {
    this._market_cap_usd = value;
  }

  get available_supply(): string {
    return this._available_supply;
  }

  set available_supply(value: string) {
    this._available_supply = value;
  }

  get total_supply(): string {
    return this._total_supply;
  }

  set total_supply(value: string) {
    this._total_supply = value;
  }

  get percent_change_1h(): string {
    return this._percent_change_1h;
  }

  set percent_change_1h(value: string) {
    this._percent_change_1h = value;
  }

  get percent_change_24h(): string {
    return this._percent_change_24h;
  }

  set percent_change_24h(value: string) {
    this._percent_change_24h = value;
  }

  get percent_change_7d(): string {
    return this._percent_change_7d;
  }

  set percent_change_7d(value: string) {
    this._percent_change_7d = value;
  }

  get last_updated(): string {
    return this._last_updated;
  }

  set last_updated(value: string) {
    this._last_updated = value;
  }
}
