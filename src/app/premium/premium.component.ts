import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {APIService} from '../shared/api.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {TrackingService} from '../shared/tracking.service';

declare var paypal;

@Component({
  selector: 'app-pricing',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {
  @ViewChild('paypal', {read: false, static: true}) paypalElement: ElementRef;

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean;
  showCancel: boolean;
  showError: boolean;
  paidFor = false;


  constructor(private apiService: APIService,
              private router: Router,
              private authService: AuthService,
              private trackingService: TrackingService
  ) { }

  product = {
    price: 4.99,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };

  goToSignUpPremium() {
    if (this.authService.isAuthenticated) {
      this.apiService.switchToPremium().subscribe(
        data => {
          console.log(data);
          this.authService.checkIsPremium();
          this.trackingService.trackStartTrialPremium();
          this.router.navigate(['/profile']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.router.navigate(['/', 'login'], {queryParams: {'premium': 'true'}});
    }
  }

  ngOnInit() {
    this.trackingService.trackOpenPremiumDescription();
    // paypal
    //   .Buttons({
    //     createSubscription: (data, actions) => {
    //       return actions.subscription.create({
    //         'plan_id': 'P-1VD54079846308903LVJK2JA'
    //       });
    //     },
    //     onApprove: async (data, actions) => {
    //       console.log('lol kek cheburek');
    //       // todo send to backend
    //       // this.apiService.postSubscription(true).subscribe(
    //       //   data => {
    //       //
    //       //   },
    //       //   error => {
    //       //
    //       //   }
    //       // );
    //       this.paidFor = true;
    //     },
    //     onError: err => {
    //       console.log(err);
    //     }
    //   })
    //   .render(this.paypalElement.nativeElement);
  }
}
