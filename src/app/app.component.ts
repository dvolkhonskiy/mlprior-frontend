import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
// import {AuthService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mlprior-frontend';

  /**
   * An object representing the user for the login form
   */
  // public user: any;

  constructor(private router: Router) { }

  // ngOnInit() {
  //   this.user = {
  //     username: '',
  //     password: ''
  //   };
  // }
  //
  // login() {
  //   this._userService.login({'username': this.user.username, 'password': this.user.password});
  // }
  //
  // refreshToken() {
  //   this._userService.refreshToken();
  // }
  //
  // logout() {
  //   this._userService.logout();
  // }


  public isArticles(): boolean {
    return (this.router.url.includes('recommended')
      || this.router.url.includes('recent')
      || this.router.url.includes('popular')
      || this.router.url.includes('details')
    );
  }
}
