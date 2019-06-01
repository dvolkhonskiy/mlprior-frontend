import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [
    './signin.component.css',
    '../../app.component.css'
  ],
  providers: [
    AuthService
  ]
})
export class SigninComponent implements OnInit {

  public user: any;

  constructor(public _userService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this._userService.login({'user': {'email': this.user.username, 'password': this.user.password}});
    this.router.navigate(['/articles/recommended']);
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }

}
