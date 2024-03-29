import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {UserProfile} from '../auth/user.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginComponent} from '../auth/login.component';
import {LoginDialogService} from '../auth/login-dialog.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css', '../app.component.css']
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  private profile: UserProfile;
  public userName: string;

  constructor(
    public authService: AuthService,
    public loginDialog: LoginDialogService,
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(
      data => {
        this.profile = data.profile;
        this.userName = this.profile.first_name !== '' ? this.profile.first_name : this.profile.email;
      },
      error => {
        console.log(error);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }

}
