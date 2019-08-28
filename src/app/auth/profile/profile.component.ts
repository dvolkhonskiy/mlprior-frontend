import {Component, Inject, OnInit} from '@angular/core';
import {APIService} from '../../shared/api.service';
import {PremiumSubscription} from '../../premium/subscription.model';
import {AuthService} from '../auth.service';
import {UserProfile} from '../user.model';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile;
  subscription: PremiumSubscription;


  isLoading = true;

  constructor(public authService: AuthService,
              private apiService: APIService,
              private route: ActivatedRoute,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      // if (params.intro === 'true') {
      //   this.showPremiumAlert();
      // }
    });

    this.authService.getProfile().subscribe(
      data => {
        this.profile = data.profile;
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

  showPremiumAlert() {
    this.dialog.open(DialogDataExampleDialog, {});
  }

  onChange() {
    this.apiService.updateSubscription(this.subscription).subscribe(
      data => console.log(data)
    );
  }

}

@Component({
  selector: 'welcome_dialog',
  templateUrl: 'welcome_dialog.html',
})
export class DialogDataExampleDialog {
  constructor() {}
}
