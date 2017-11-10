import { Component, OnInit } from '@angular/core';
import {TranslateService} from "../translate/translate.service";
import {SharedService} from "../shared-service/shared.service";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {

  languageList: any[] = [];
  languageValue: string = '';

  constructor(private translator: TranslateService,
              private sharedService: SharedService) {
  }

/* 

  Once languages are set up add them to this object 

  Example:

      this.languageList.push({label:'Espanol', value:'es'});

*/

  ngOnInit() {
    this.languageValue = this.sharedService.getLanguage();
    this.translator.use(this.languageValue);
    this.languageList = [];
    this.languageList.push({label:'English', value:'en'});
    this.languageList.push({label:'한국어', value:'ko'});
  }

  setLanguage(event){
    this.translator.use(event.value);
    this.sharedService.setLanguage(event.value);
  }

}
