import {Component, OnInit} from "@angular/core";
import { RouteConstants} from "../constants/routes";
import {Router} from "@angular/router";

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  returnHome() {
    this.router.navigate(['/'])
  }

}
