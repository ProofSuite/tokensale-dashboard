export class TransactionHistory {
  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }

  private id: string;
  private _type: string;
  private _date: string;
  private _description: string;
  private _status: string;
  private _amount: string;
  private _userId: string;
  private _transactionHash: string;
  private _createdAt: string;

  get transactionHash(): string {
    return this._transactionHash;
  }

  set transactionHash(value: string) {
    this._transactionHash = value;
  }

  get _id(): string {
    return this.id;
  }

  set _id(value: string) {
    this.id = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get amount(): string {
    return this._amount;
  }

  set amount(value: string) {
    this._amount = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }
}
