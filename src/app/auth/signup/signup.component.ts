import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css',
    '../../app.component.css'
  ],
  providers: [
    AuthService
  ]
})
export class SignupComponent implements OnInit {
  public user: any;
  constructor(public userService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  register() {

  }

}
