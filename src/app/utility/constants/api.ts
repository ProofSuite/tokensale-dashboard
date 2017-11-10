export class API {
  
  // INTERNAL API ROUTES

  public static Login = 'login';
  public static COUNTRY = 'country';
  public static SIGNUP = 'signup';
  public static Referrals = 'referrals';
  public static VERIFY_OTP = 'verifyemailotp';
  public static RESEND_OTP = 'resendemailotp';
  public static UPDATE_USER_DETAIL = 'user/updateuserdetails';
  public static UPDATE_SECURE_LOGIN = 'user/updatesecurelogin';
  public static TRANSACTION = 'transaction';
  public static REFERRALS = 'referrals';

// EXTERNAL API CALLERS
  /* 

  Basic Price Conversion Api 
  
  Api return payload sample schema:

  {"ticker":{
     "base":"ETH",
     "target":"USD",
     "price":318.307689,
     "volume":"439673.05228462",
     "change":"0.72641775"},
     "timestamp":1510284602,
     "success":true,
     "error":""
  } 

  */

  public static ETH_PRICE = "";
 
  /* Shapeshift API UNUSED at the moment*/
  
  public static BUY_ETHER = "https://shapeshift.io/shift";

  /* Place Frontend API URL here */
   
  /*
  Sample schema:

  {"status":"success",
   "message":{
     "totalSupply":1298746.5713916372,
     "decimals":"18",
     "symbol":"PRFT",
     "transfers":false,
     "contributors":"49",
     "totalWeiRaised":"159246285616000000000",
     "firstCheckpoint":4.7020336e+21,
     "secondCheckpoint":9.4040672e+21,
     "thirdCheckpoint":1.88081344e+22,
     "firstCheckpointPrice":74800000000000000,
     "secondCheckpointPrice":79200000000000000,
     "thirdCheckpointPrice":83600000000000000,
     "tokenCap":1.0686442870752744e+24,
     "started":true,"time":1512133200000,
     "transfersEnabled":false
    }
  }

  */ 
  public static DASHBOARD = "";
  
  /* Place your balance api here */

  public static CHECK_BITCOIN_BALANCE = "https://blockchain.info/q/addressbalance/";
  
  /* Ethereum Price Api */
 
  public static GET_ETHER = "https://api.coinmarketcap.com/v1/ticker/ethereum/";
}

export class IMAGEConstants {
  public static IMAGE_FILE_SIZE_LIMIT = 1e+7;
  public static VALID_IMAGE_SIZE = 'Image should be gif/jpeg/jpg/png and less than 10MB';
}
