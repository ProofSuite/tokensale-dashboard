# Tokensale Dashboard

![This is an implementation of the Proof Tokensale utilizing the code found in this repository.  You can see it at work at app.prooftokensale.com](https://i.imgur.com/dPlB05G.png)

[Working Example](https://app.prooftokensale.com)

The Proof Tokensale dashboard is an agnostic wrapper for erc-20 enabled tokens and tokensale controller contracts.  

NOTE: This software is still under rapid development and will undergo constant changes.  These include easy-deploy scripts, front end reactivity improvements and basic code refactoring.  Keep a close eye on commit records so your own deployments can keep being updated with the latest code.

The flow of this program is similar to MyEtherWallet in that all wallet management is handled clientside with only some basic record keeping and email data are kept in a stateful API.  Otherwise, users can import their own UTC files and their passwords are kept entirely removed from any computer than their own.  Since passwords are directly linked to their clientside code, there is **no way to recover user passwords or accounts** and any password change will effectively destroy that accounts wallet.

Luckily, the user can download their token wallet and and even open and manage it on MEW if that is what they prefer.

# 1. Application Summary

**FrontEnd**

The front end components of this application are based off of a standard Angular 2 Mechanism.  Styles are handled through Sass CSS and a single CSS sheet.  

![](https://i.imgur.com/wzxitRy.png)

The template system is based off of Angular 2's view system.  In this document, the term 'view' and 'views' will refer to HTML templating sheets unless otherwise noted.

**Backend**

The Angular2 Application relies on a NodeJS API backed by a NoSQL MongoDB database.  The code for this Node application can be found in the root repository for this dashboard. 

![All wallets are only kept clientside with the backend database only keeping encrypted 'snapshots' of already encrypted containers.](https://i.imgur.com/4QPwyA2.png)

Likewise, due to the constantly changing standards around controller contracts, frontend components for showing a countdown, displaying total contributors, grabbing total issued tokens, etc.


**Contracts**

The purchasing element of this application relies on the fallback being the purchasing function.  One of the first improvements to be implemented will be the integration of controller contracts that have other means of purchase such as specialized function calls.  Contracts compatible with the Angular app can be seen both our own [Token Sale Contract](https://github.com/ProofSuite/ProofTokenSale) and can be generated with the [Proof CLI application](https://github.com/ProofSuite/TokenSaleGeneratorCLI).


**Angular2 & Typescript**

![](http://www.masterangular.com/images/angular2typescript.png)

Angular 2 is the core framework for this app.  Integrated with Node, it requires a build in order to deploy into a production server.


**Customizability**

Design can be modified for any preferred aesthetic in order to fit the feel and intent of a tokensale. Likewise, languages can be easily added or removed through simple typescript copy and pasting.

![All styling and logos are kept in local directories.  Most design is entirely handled by style sheets.
](https://i.imgur.com/BliMtWW.png)





# 2. Requirements



- Node 8.x.x
- Angular 2
- Angular-cli
- Backend Node API. See [here]().
- A Front End API for reading Contract State

# 3. Set up

## Installing Node

### Linux: Debian || Ubuntu Node installation (Package Manager)
[Source]("https://nodejs.org/en/download/package-manager/")

First get the reference information for node 8.x from the package repository:

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -` 

Next, install node:

`sudo apt-get install -y nodejs`

If you need further Installation help with your particular version of Linux or wish to build from source check out the [node.js installation instructions and installer repo]("https://nodejs.org/en/download/").

### MacOS Node installation (Official Installer)

Get the official [MacOS installer]("https://nodejs.org/dist/v8.9.1/node-v8.9.1.pkg"). 

Open the .pkg you just downloaded and follow the directions on the dialogue.

If you prefer using home-brew for installing software, follow [this tutorial]("https://changelog.com/posts/install-node-js-with-homebrew-on-os-x") for getting set up.

### Windows Node installation (Official Installation)

Get the official [Windows installer]("https://nodejs.org/dist/v8.9.1/node-v8.9.1-x86.msi") and follow the onscreen instructions for setting up node.

NOTE: We recommend running the Node API on either a MacOS or Linux-based operating system.  From here forward, this deployment document will use linux-bash syntax in order to describe configuration commands.  In order to follow along you may need to check out some of the ways to use Bash in Windows located in the [TroubleShooting](#4.Troubleshooting) section of this document.


## Installing Angular Cli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

In order to run, compile, and deploy test servers, we strongly recommend using the angular cli application.  Once Node is installed, getting set up with the angular CLI is easy.  

After getting the newest version of node simply run the following command:

`npm install @angular/cli`

**Starting your Servers**

In order to run a test server run:

`ng serve`

which will launch a localhost deployment on port 4144 where you can modify your code.  The angular serve tool will detect changes and automatically re-compile and redeploy your angular.  We recommend developing from here for obvious reasons.

for production buildcode run:

`ng build --target=production --aot`

Note that since most of your references, API's, and keys have not been set so running `ng build` will probably fail prior to configuration.  If it runs on first try you may need to call an exorcist for your workstation.

## Install The Application
First, clone this repo with the command:

`git clone https://github.com/ProofSuite/TokenSaleDashboard.git`

In the app root, direct the node packet manager to locally install the dependencies with:

`npm install`

## Deploying Backend Node Services

Checkout the [Proof Github](https://github.com/proofsuite) for information on how to get set up with the default backend service.  A different backend can be set up as long as it uses the same JWT protocol and key as the Angular 2 application.  

# 4. Configuration

## First Time Configuration

The first thing you will need are 2 smart contracts deployed on Ethereum:

1. Your Controller address
2. A Token Address  

The Angular 2 Application is set up to interface with controller/token contract pairs with the application directly sending currency to the controller which then directs the token contract to distribute tokens.  In the provided example [here]() we use mintable tokens.  The angular app is entirely removed from the distribution process which happens entirely on the blockchain.  

So in summary, the application is a contract-agnostic wallet manager that sends out transactions to the blockchain and tracks the token on the blockchain whether on the mainnet, a private Ethereum network, or a testnet.

- **Create Contracts**: After Creating your contracts, make sure you have access to the contract address and contract ABI.  Next, you will add them to the `base-constants.ts` file located in `src/app/utility/constants/` inside your app directory.

- **Connect the App to the blockchain**: At the top of `base-constants.ts` assign your preferred web3 provider to the variable, `MAIN_NET_WEB3`.  NOTE: This application is not yet set up to utilize metamask but with a few tweaks using the metamask providers is totally possible.

When you are done, you should see something like this at the top of your `base-constants.ts` file:

```javascript 
public static MAIN_NET_WEB3: string = "https://mainnet/infura.io/<YOUR_API_KEY>"
```

- **Set up your Node Api Provider**: I you haven't already you will need to set up a backend API provider for your database.  You can get the source for our implementation of the Node Provider [here](https://github.com/ProofSuite/TokenSaleNodeApi).  After that, edit the variable `Api` at the top of your base-constants.ts file.  

When you are finished setting it up, set your Node API provider to the variable `Api`.  This will allow the dashboard to sign up users, retrieve saved encrypted wallet containers, and set up referral codes.

when you are finished, record where your node app is serving and add that URI to your `base-constants.ts` file with the `/api/` string concatenated on the end:

```javascript
public static Api: string = "<YOUR_API_URL_HERE>/api/";
```

- **Adding your Controller**: Under the class `TokenContract` add the contract address to `CONTRACT_ADDRESS` and that contract's flattened ABI to `CONTRACT_ABI`.  This is your base where the landing api will pull most its stats.

- **Adding your Token**: Under the class `TokenContract` add your contract address to `CONTRACT_ADDRESS` and the flattened contract ABI to `CONTRACT_ABI`.  When you are finished, your classes should look like so:

![](https://i.imgur.com/ohEgxUG.png)

NOTE: This contract can be on either the mainnet or the testnet.  

- **Running a Test Server**: From the root level of your application directory run `ng serve` and your application should launch.  The default location for the test serv is:

 `localhost:4200`

Navigate here to see your application.  You should see a basic landing page that looks like this:

<img src=https://i.imgur.com/bARirt7.png>

Don't worry about the styling and bonuses section, these are left over from the Proof Token Sale and have been left in to allow points of reference when modifying your views.  

Voila, you are now ready to begin working on front-end elements and styling your dashboard.

**NOTE: If you are having trouble logging in after registering, check the troubleshooting section for a library hotfix under 'Keythereum Hotfix'**

## Directory Map

This is a big app so getting around can be a bit cumbersome, we recommend using a javascript/typescript printing IDE such as Sublime or Visual Studio.  Since getting accustomed to apps this size can be a hassle as well, we have included a basic directory map of the current build.  This will be updated with the code as it evolves.

```
TokenSaleDashboard
    docs
    e2e
    node_modules
    src
        app
            _guards
            admin
            user-auth
            utility
            assets
            environments
            
        assets
        environments
```

Legend:

`docs` - Docs contains the documentation that accompanies this guide
`e2e` - E2E contains testing files for the dashboard.  See TODO's
`node_modules` - Node Library
`src` - Main app directory
`_guards` - Route Snapshots
`admin` - All files and views relating to the inner workings of the dashboard (after sign-in)
`user-auth` - All files and views relating to the pre-sign-in workings of the dashboard
`utility` - Utility files for plugins and listing of constants and configuration objects
`assets` - Design related files
`environments` - Production/Development environment files (See TODO's)

## Styling Your Dashboard

Logos, Styles, and view elements are kept in following directory:

`src/app/assets`

inside this directory are image, Javascript, and scss files.  There are also basic styles.css and app.component.css sheets.  By editing these, you can 
change the look and feel of your dashboard.

Since this is an exhaustive process, more information can be found in the STYLING_GUIDE.md sheet found in the docs section of the root.

## How to Add or Modify Languages

Location:

`app/utility/translate`

Translations can be added on your dashboard quickly and easily by simply adding a json structure and file to your /translate folder and then referencing it inside the controller.  After this you will need to add it to the view controller that handles the language selector itself.

```javascript
// app/utility/translate/lang.en.ts

export const LANG_EN_NAME = 'en';

export const LANG_EN_TRANS = {
  'login': 'Login',
  'registration': 'Registration',
  'register' : 'Register',
  'otp': 'One Time Password',
  'firstName': 'First Name',
  'lastName': 'Last Name',
  //...
  'countryCode':'Country Code',
}
```

You will also need to add a reference for this file inside of the translations.ts file located in the same directory:

```javascript
// app/utility/translate/translations.ts

import {LANG_EN_NAME, LANG_EN_TRANS} from "./lang.en";
import {LANG_ES_NAME, LANG_ES_TRANS} from "./lang.es";
import {LANG_KO_NAME, LANG_KO_TRANS} from "./lang.ko";

export const TRANSLATIONS = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_ES_NAME]: LANG_ES_TRANS,
  [LANG_KO_NAME]: LANG_KO_TRANS,
};
```

On your view:

```html
<button tooltipPosition="top">
    {{'login' | translate}}
</button>    
```


In order to add your language to your view's language selector go to the file language-selector.components.ts located at:

`app/utility/language-selector/language-selector.components.ts`

Wrap how you want your labels to look and push them into the languageList for your view using the languageList view:

`this.languageList.push({label:'English', value:'en'});`

Add them inside of the ngOnInit() object like so:

```javascript
 ngOnInit() {
    this.languageValue = this.sharedService.getLanguage();
    this.translator.use(this.languageValue);
    this.languageList = [];
    this.languageList.push({label:'English', value:'en'});
    this.languageList.push({label:'한국어', value:'ko'});
  }
```

Other examples of languages can be found in the application files.  

In order to change the 'default' language, simply place the abbreviation of that language inside of the argument field for translateService.use() located inside of the app.component.ts file located in /app in the AppComponent constructor.

```javascript
  constructor(private sharedService: SharedService,
            private router:Router, private translateService: TranslateService) {
    // this.sharedService.getLanguage().subscribe(language => {
    let language = this.sharedService.getLanguage();
      if (language) {
        this.translateService.use(language);
      } else {
        this.translateService.use('en');  //Your default language
        this.sharedService.setLanguage('en');
      }
    // })
  }
```

## On Linking a Smart Contract

**A Note on Contract Restrictions**

This application can interface with smart contracts built around the ERC-20 standard including controllers like the mini-me contract.  [Example](https://github.com/Giveth/minime)

The Angular Application is a 'dummy' application that merely sends a basic Ethereum transaction to the contract which then handles the token distribution.

The terms and limits of the sale must be handled by the 'controller' contract of the token.

**Adding Your Contracts** 

In order for contracts to be added, references to their location must be added to the base-constants.ts file located in:

`/app/utility/constants/base-constants.ts` 

If you wish to make an actual function call to the controller contract, you must edit the component files inside src/app/admin/send and src/app/admin/header-sidebar/buy-token
utilizing the the web3 library and handlers marked on the headers of those files.

## Adding a Frontend Contract Tracking API

Sample Schema:

Your API should read off of your smart contract and return a payload with the same keys as these (As for decimals and the sort, you can handle that as you like).

Add the URI for your endpoint in the `src/app/constants/api.ts` file assigned to the variable `DASHBOARD`.

```
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
```

## Important Paths
- **Constants directory location:** 

`src/utility/constants/base-constants.ts`

- **Directory location of Translation Text:** 

`src/app/utility/translate`

Basefile: 

`lang.en.ts`


# 5. Troubleshooting & Appendix

## Keythereum HotFix

```
node_modules=>keythereum=>index.js

line no 10 change to =>var crypto = require('browserify-aes');
add new line at 11 =>var randomBytes = require('randombytes');
line no 305 change to =>return checkBoundsAndCreateObject(randomBytes(keyBytes + ivBytes + keyBytes));
```

With certain builds the keythereum library may have some compatibility issues with the Angular build.  Although this will be fixed in future commits, for now there is a simple edit that needs to be made.

- In your `/node_modules/keythereum/index.js` file edit line 10 so it reads:

`var crypto = require('browserify-aes');`

- Add a new line after line 10 with the following:

`var randomBytes = require('randombytes')`

- Finally, on line 305 remove the `crypto.` so the line looks like this:

`return checkBoundsAndCreateObject(randomBytes(keyBytes + ivBytes + keyBytes));`

# 6. TO DO

- More elegantly handle reading off of the contract internally using either metamask or web3 for getting frontend elements.
- Get better support for a wide array of contracts
- Further expand the types of token sale factories and controllers supported
- Refactor code references and headers to have constants and variables stem from a single config file
- Better in-code test/production segmentation including adding test contracts
- Easy styling options with a site admin panel
- More Tests!
- Improving this document to reflect other problems

# 7. Known Issues
- Configuration and customization are currently fairly cumbersome
- Under certain nginx configurations targeting a specific URI breaks the routes
- Certain windows have reactiveness problems in design.

# 8. Gallery

<img src=https://i.imgur.com/PT56DTp.jpg height=600px>
 

Also, Special Thanks [Smart Sense Solutions](https://smartsensesolutions.com/) for their assistance on getting the first iteration of this dashboard ready.
