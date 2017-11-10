import { Component, OnInit } from '@angular/core';
import {SharedService} from "../shared-service/shared.service";

@Component({
  selector: 'progress-hud',
  templateUrl: 'progress-hud.component.html',
  styleUrls: ['progress-hud.component.css']
})
export class ProgressHudComponent implements OnInit {
  isLoading : boolean = false
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getLoader().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
