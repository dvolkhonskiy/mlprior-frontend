import { Component, OnInit } from '@angular/core';
import {APIService} from '../../shared/api.service';
import {PremiumSubscription} from '../../premium/subscription.model';
import {AuthService} from '../auth.service';
import {UserProfile} from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile;
  subscription: PremiumSubscription;
  constructor(protected authService: AuthService, private apiService: APIService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      data => {
        this.profile = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

    this.apiService.getSubscription().subscribe(
      data => {
        this.subscription = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
