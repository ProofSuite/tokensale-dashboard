import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RouteConstants} from "../../utility/constants/routes";
declare var particlesJS:any;

@Component({
  selector: 'app-complete-ico',
  templateUrl: './complete-ico.component.html'
})
export class CompleteIcoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {});
  }

  landing(){
    this.router.navigate(["/"]);
  }
}
