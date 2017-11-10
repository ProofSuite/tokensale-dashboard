import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'no-data',
  templateUrl: 'no-data.component.html',
  styleUrls: ['no-data.component.css']
})

export class NoDataComponent implements OnInit {

  @Input()
  noDataMsg: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
