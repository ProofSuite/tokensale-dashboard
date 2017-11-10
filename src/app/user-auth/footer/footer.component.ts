import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RouteConstants} from "../../utility/constants/routes";
import {SharedService} from "../../utility/shared-service/shared.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  termsDialog: boolean = false;
  termsAndConditionDialog: boolean = false;
  privacyPolicyDialog: boolean = false;

  constructor(private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getTokenTermModal().subscribe((isOpen) => {
      switch (isOpen[1]){
        case 1:
          this.termsDialog = isOpen[0];
          break;
        case 2:
          this.termsAndConditionDialog = isOpen[0];
          break;
        case 3:
          this.privacyPolicyDialog = isOpen[0];
          break;
      }
    });
  }

  home(){
    this.router.navigate(["/"]);
  }

  showtermDialog() {
    this.termsDialog = true;
  }


  showtermAndConditionDialog() {
    this.termsAndConditionDialog = true;
  }

  showPrivacyPolicyDialog() {
    this.privacyPolicyDialog = true;
  }

}
