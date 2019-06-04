import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../app.component.css'
  ],
  providers: []
})
export class LoginComponent implements OnInit {

  public user: any;
  // error messages received from the login attempt
  public errors: any = [];

  isLoading = false;

  constructor(public userService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.user = {
      email: '',
      password: ''
    };
  }

  login() {

    // const email = form.value.email;
    // const password = form.value.password;
    this.isLoading = true;
    this.userService.login(this.user.email, this.user.password).subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err.error);
        this.isLoading = false;
        this.errors = err.error;
      }
    );
  }

}
