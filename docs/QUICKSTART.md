# Tokensale Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

We recommend using the Angular CLI for both building and testing.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

node_modules=>keythereum=>index.js

line no 10 change to =>var crypto = require('browserify-aes');
add new line at 11 =>var randomBytes = require('randombytes');
line no 305 change to =>return checkBoundsAndCreateObject(randomBytes(keyBytes + ivBytes + keyBytes));

<ngx-qrcode [qrc-element-type]="elementType" [qrc-value] = "value">
  </ngx-qrcode>
  NgxQRCodeModule,
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = 'Techiediaries';
