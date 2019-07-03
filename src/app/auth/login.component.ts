import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../app.component.css'
  ],
  providers: []
})
export class LoginComponent {

  isLoginMode = true;
  isLoading = false;
  public errors: any = [];

  constructor(public authService: AuthService, private router: Router) {  }


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
    } else {
      const firstName = form.value.firstName;
      const secondName = form.value.secondName;
      authObs = this.authService.signUp(firstName, secondName, email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
          this.authService.redirectUrl = null;
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        console.log(error);
        this.errors = error.error.errors;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  // login() {
  //   this.isLoading = true;
  //   this.authService.login(this.user.email, this.user.password).subscribe(
  //     data => {
  //       console.log(data);
  //       this.isLoading = false;
  //       if (this.authService.redirectUrl) {
  //         this.router.navigate([this.authService.redirectUrl]);
  //         this.authService.redirectUrl = null;
  //       } else {
  //         this.router.navigate(['/dashboard']);
  //       }
  //     },
  //     err => {
  //       console.log(err.error);
  //       this.isLoading = false;
  //       this.errors = err.error;
  //     }
  //   );
  // }

}
