import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-country-code',
  templateUrl: './country-code.component.html',
  styleUrls: ['./country-code.component.css']
})
export class CountryCodeComponent implements OnInit {
  @Output() changeCountry:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCountryChange(event){
    this.changeCountry.emit(event);
  }

}
