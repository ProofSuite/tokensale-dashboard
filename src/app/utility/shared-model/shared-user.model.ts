export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _telephoneNumber: string;
  public _country: number;
  private _email: string;
  private _encryptContainer: string;
  private _is2FAOn:boolean;
  private _referralCode:boolean;

  get encryptContainer(): string {
    return this._encryptContainer;
  }

  set encryptContainer(value: string) {
    this._encryptContainer = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get telephoneNumber(): string {
    return this._telephoneNumber;
  }

  set telephoneNumber(value: string) {
    this._telephoneNumber = value;
  }

  get country(): number {
    return this._country;
  }

  set country(value: number) {
    this._country = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get is2FAOn(): boolean {
    return this._is2FAOn;
  }

  set is2FAOn(value: boolean) {
    this._is2FAOn = value;
  }

  get referralCode(): boolean {
    return this._referralCode;
  }

  set referralCode(value: boolean) {
    this._referralCode = value;
  }
}
