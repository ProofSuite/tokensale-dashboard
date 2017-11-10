import { Component, OnInit } from '@angular/core';
import {slideUpFooter} from "../animation";

@Component({
  selector: 'admin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations:[slideUpFooter]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
