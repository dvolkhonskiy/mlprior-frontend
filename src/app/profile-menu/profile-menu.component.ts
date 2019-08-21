import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css', '../app.component.css']
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  // private userSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() { }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }

}
