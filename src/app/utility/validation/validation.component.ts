import {Component, OnInit, Input} from '@angular/core';

@
  Component({
  selector: 'validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  @Input() errMsg: string;

  constructor() { }

  ngOnInit() {

  }

}
