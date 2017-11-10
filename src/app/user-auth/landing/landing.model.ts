export class Landing {
  private _totalSupply: string;
  private _decimals: string;
  private _symbol: string;
  private _transfers: boolean;
  private _contributors: string;
  private _totalWeiRaised: string;
  private _firstCheckpoint: number;
  private _secondCheckpoint: number;
  private _thirdCheckpoint: number;
  private _firstCheckpointPrice: number;
  private _secondCheckpointPrice: number;
  private _thirdCheckpointPrice: number;
  private _tokenCap: number;
  private _started: boolean;
  private _time: number;
  private _transfersEnabled: boolean;

  get totalSupply(): string {
    return this._totalSupply;
  }

  set totalSupply(value: string) {
    this._totalSupply = value;
  }

  get decimals(): string {
    return this._decimals;
  }

  set decimals(value: string) {
    this._decimals = value;
  }

  get symbol(): string {
    return this._symbol;
  }

  set symbol(value: string) {
    this._symbol = value;
  }

  get transfers(): boolean {
    return this._transfers;
  }

  set transfers(value: boolean) {
    this._transfers = value;
  }

  get contributors(): string {
    return this._contributors;
  }

  set contributors(value: string) {
    this._contributors = value;
  }

  get totalWeiRaised(): string {
    return this._totalWeiRaised;
  }

  set totalWeiRaised(value: string) {
    this._totalWeiRaised = value;
  }

  get firstCheckpoint(): number {
    return this._firstCheckpoint;
  }

  set firstCheckpoint(value: number) {
    this._firstCheckpoint = value;
  }

  get secondCheckpoint(): number {
    return this._secondCheckpoint;
  }

  set secondCheckpoint(value: number) {
    this._secondCheckpoint = value;
  }

  get thirdCheckpoint(): number {
    return this._thirdCheckpoint;
  }

  set thirdCheckpoint(value: number) {
    this._thirdCheckpoint = value;
  }

  get firstCheckpointPrice(): number {
    return this._firstCheckpointPrice;
  }

  set firstCheckpointPrice(value: number) {
    this._firstCheckpointPrice = value;
  }

  get secondCheckpointPrice(): number {
    return this._secondCheckpointPrice;
  }

  set secondCheckpointPrice(value: number) {
    this._secondCheckpointPrice = value;
  }

  get thirdCheckpointPrice(): number {
    return this._thirdCheckpointPrice;
  }

  set thirdCheckpointPrice(value: number) {
    this._thirdCheckpointPrice = value;
  }

  get tokenCap(): number {
    return this._tokenCap;
  }

  set tokenCap(value: number) {
    this._tokenCap = value;
  }

  get started(): boolean {
    return this._started;
  }

  set started(value: boolean) {
    this._started = value;
  }

  get time(): number {
    return this._time;
  }

  set time(value: number) {
    this._time = value;
  }

  get transfersEnabled(): boolean {
    return this._transfersEnabled;
  }

  set transfersEnabled(value: boolean) {
    this._transfersEnabled = value;
  }
}
