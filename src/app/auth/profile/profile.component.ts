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


  isLoading = true;

  constructor(public authService: AuthService, private apiService: APIService) { }

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
        this.isLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  onChange() {
    this.apiService.updateSubscription(this.subscription).subscribe(
      data => console.log(data)
    );
  }

}
