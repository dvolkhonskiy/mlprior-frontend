import {Component, Inject, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import {TrackingService} from '../shared/tracking.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../app.component.css'
  ],
  providers: []
})
export class LoginComponent implements OnInit {

  isLoginMode = false;
  isLoading = false;
  public errors: any = [];
  returnToPremiumPage = false;
  nextPage: any[];

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private trackingService: TrackingService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) dialogParams
  ) {
    this.nextPage = dialogParams.next;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.premium === 'true') {
        this.returnToPremiumPage = true;
      }
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      this.trackingService.trackLogIn();
    } else {
      const firstName = form.value.firstName;
      const secondName = form.value.secondName;
      authObs = this.authService.signUp(firstName, secondName, email, password);
      this.trackingService.trackSignUp();
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.dialog.getDialogById('login').close();
        if (this.nextPage) {
          this.router.navigate(this.nextPage);
        }
        // if (this.returnToPremiumPage) {
        //   this.router.navigate(['/premium']);
        // } else if (this.authService.redirectUrl) {
        //   this.router.navigate([this.authService.redirectUrl]);
        //   this.authService.redirectUrl = null;
        // } else {
        //   this.router.navigate(['/dashboard']);
        // }
      },
      error => {
        console.log(error);
        this.errors = error.error.errors;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
