export class CommonRegexp {
  public static NUMERIC_REGEXP = '^[0-9]*$';
  public static ALPHABETS_REGEXP = "^[a-zA-Z][a-zA-Z ]*$";
  public static ALPHABETS_SPECIALCHAR_REGEXP = "^[a-zA-Z][-a-zA-Z0-9+&@#/%=~_| ]*$";
  //public static NUMERIC_FLOAT_REGEXP = /^(?:0|0?\.(?:0[1-9]|[1-9]\d?)|(?:[1-9]|1\d|2[0-3])(?:\.\d{1,2})?|99(?:\.0{1,2})?)$/;
  public static EMAIL_ADDRESS_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static PASSWORD =/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9\d]{6,50}$/
  public static URL_REGEXP = "\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]";
  public static ALPHA_NUMERIC = '^[0-9a-zA-Z]*$';
  public static NUMERIC_FLOAT_REGEXP = /^(([0-9]{0,1}[0-9]{0,})+(\.\d{1,5})?)$/;
  public static PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
}

export class CommonValidationMessages {
  public REQUIRED: string = ' is required';
  public PASSWORD: string = 'Password' + this.REQUIRED;
  public CONFIRM_PASSWORD: string = 'Confirm password' + this.REQUIRED;
  public NOT_MATCHED: string = "Confirm password doesn't match";
  public EMAIL_ADDRESS: string = 'Email address' + this.REQUIRED;
  public VALID_EMAIL_ADDRESS: string = 'Enter valid email address';
  public OTP: string = 'OTP' + this.REQUIRED;
  public OTP_LENGTH = 'OTP length must be allowed 4 digits.';
  public OTP_VAID = 'OTP must be in number only';
  public FIRST_NAME = 'First name' + this.REQUIRED;
  public LAST_NAME = 'Last name' + this.REQUIRED;
  public FIRST_NAME_LENGTH = 'First name length between 3 to 50';
  public LAST_NAME_LENGTH = 'Last name length between 3 to 50';
}
