import {Component, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {RouteConstants} from "../../utility/constants/routes";
import * as moment from 'moment';
import {API} from "../../utility/constants/api";
import {APIManager} from "../../utility/shared-service/apimanager.service";
import {BaseComponent} from "../../utility/base-component/base.component";
import {ToastsManager} from "ng2-toastr";
import {SharedService} from "../../utility/shared-service/shared.service";
import {Landing} from "./landing.model";
import {AppConstant, Contract} from "../../utility/constants/base-constants";
import {Ethereum} from "./ether.model";
import {Web3Service} from "../../utility/shared-service/web3.service";
declare var particlesJS: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent extends BaseComponent implements OnInit, OnDestroy {

  // countdown timer variables
  timerInterval;
  seconds;
  days;
  hours;
  minutes;
  tokenStart: boolean = false;
  tokenTime: number;
  dollarRaised: any;
  landing: Landing;
  ethereum: Ethereum[];
  data: any;
  options: any;

  constructor(private web3Service: Web3Service,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef,
              private router: Router,
              private apiManager: APIManager) {
    super(toastr, vcr);
  }

  ngOnInit() {
    this.chartData();
    particlesJS.load('landing-particles-js', 'assets/js/particles.json', function () {});
    this.getData();
    let param1 = this.route.snapshot.queryParams["ref"];
    if (param1 && param1.length <= 8 && param1.length >= 8) {
      this.sharedService.setRefer(param1);
    } else {
      this.sharedService.setRefer('');
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  viewRegisterForm() {
    this.router.navigate(["/" + RouteConstants.REGISTERATION]);
  }

  loginForm() {
    this.router.navigate(["/" + RouteConstants.LOGIN]);
  }

  completeICO() {
    this.router.navigate(["/" + RouteConstants.COMPLETE_ICO]);
  }

  getEvent(time) {
    let currentTime = new Date();
    let endTime = new Date()
    endTime.setTime(time);
    let startTime = new Date();
    if (currentTime.getTime() >= startTime.getTime() && (currentTime.getTime() < endTime.getTime())) {
      this.countDownTimer(endTime, currentTime);
    }
  }

  // Update the count down every 1 second
  countDownTimer(endDateTime, currentDateTime) {
    let self = this;
    this.timerInterval = setInterval(function () {
      // Find the distance between now an the count down date
      currentDateTime.setSeconds(currentDateTime.getSeconds() + 1);
      let distance = endDateTime.getTime() - currentDateTime.getTime();

      if (distance != NaN && distance > 0) {
        // Time calculations for days, hours, minutes and seconds
        self.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        self.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        self.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        self.seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("daysPr")) {
          document.getElementById("daysPr").setAttribute("data", self.days);
          document.getElementById("hoursPr").setAttribute("data", self.hours);
          document.getElementById("minutesPr").setAttribute("data", self.minutes);
          document.getElementById("secondsPr").setAttribute("data", self.seconds);
        } else {
          if (this.timerInterval) {
            clearInterval(this.timerInterval)
          }
        }
      }
      else {
        self.days = " -- ";
        self.hours = " -- ";
        self.minutes = " -- ";
        self.seconds = " -- ";
      }
      // If the count down is over, write some text
      if (distance < 0) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval)
        }
        ;
        self.days = " -- ";
        self.hours = " -- ";
        self.minutes = " -- ";
        self.seconds = " -- ";
      }
    }, 1000);
  }

  getData() {
    this.apiManager.getLocalAPI(API.DASHBOARD).subscribe(res=> {
      this.landing = res.message;
      this.tokenStart = this.landing.started;
      this.tokenTime = this.landing.time;
      this.getEvent(this.tokenTime);
      this.getEtherData();
    }, error=> {

    })
  }

  getEtherData() {
    this.apiManager.getLocalAPI(API.GET_ETHER).subscribe(res=> {
      this.ethereum = res;
      if (this.ethereum)
        this.dollarRaised = Math.round(+this.web3Service.weiToEtherConvert(this.landing.totalWeiRaised) * +this.ethereum[0].price_usd);
    }, error=> {

    })
  }

  getProofTokensRaised(erc20Units): number {
    if (erc20Units) {
      return Math.round(erc20Units / (10 ** 18));
    }
    else {
      return 0;
    }
  }

  weiConvertValue(value): number {
    if (value)
      return this.web3Service.weiToEtherConvert(value);
    else return;
  }


  roundValue(value): any {
    if (value) {
      var valList = value.toString().split(".");
      return (valList[0] + "." + valList[1].slice(0, 3));
    }
    return 0;
  }

  getTokenPrice() {
    return Contract.TOKEN_PRICE;
  }

  chartData() {
    this.data = {
      labels: ["5%", "10%", "15%", " 20%"],
      datasets: [{
        label: 'PREMIUM',
        backgroundColor: '#00c8aa',
        data: [16, 11, 6, 1]
      },
      ]
    };
    var dataShow = ["15%", "10%", "5%", " 0%"];
    this.options = {
      title: {
        display: true,
        text: '',
        fontSize: 16,
        color: '#fff'
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#fff'
        }
      },
      events: false,
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        duration: 1,
        onComplete: function () {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = "#00c8aa";

          this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              // var data = dataset.data[index];
              var data = dataShow[index];
              ctx.fillText(data, bar._model.x + 17, bar._model.y + 8);
            });
          });
        }
      },
      scaleLineColor: 'transparent',
      scales: {
        xAxes: [{
          // display: false,
          scaleLabel: {
            display: false,
            fontColor: "#fff",
            labelString: '% of tokens'
          },
          ticks: {
            beginAtZero: true,

            display: false,
            fontColor: 'white',
            mirror: true,
          },
          gridLines: {
            color: 'transparent',
            drawBorder: false,
            display: false
          }
        }],
        yAxes: [{
          barPercentage: 1,
          categoryPercentage: 0.5,

          display: true,
          scaleLabel: {
            display: true,
            fontColor: "#fff",
            labelString: '% of tokens sold'
          },
          ticks: {
            beginAtZero: true,
            fontColor: 'white',
            display: true,
            fontSize: 17,
          },
          gridLines: {
            color: 'transparent',
            drawBorder: false,
            display: false
          }
        }]
      }
    };
  }
}
