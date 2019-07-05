import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

interface UserResponse {
  email: string;
  token: string;
}

export interface AuthResponseData {
  user: UserResponse;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private API_URL_LOGIN = environment.baseUrl + 'api/auth/login';
  private API_URL_SIGN_UP = environment.baseUrl + 'api/auth/signup';
  private API_URL_USER = environment.baseUrl + 'api/user';

  public redirectUrl: string;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(firstName: string, secondName: string, email: string, password: string) {
    let data = {user: {email: email, password:  password}};
    console.log(data);
    return this.http.post<AuthResponseData>(this.API_URL_SIGN_UP, data).pipe(
      tap(
        resData => {
          this.handleAuthentication(resData.user.email, resData.user.token);
          this.sendProfileData(email, firstName, secondName);
        })
    );
  }

  login(email: string, password: string) {
    let data = {user: {email: email, password:  password}};
    return this.http.post<AuthResponseData>(this.API_URL_LOGIN, data).pipe(
      tap(
        resData => {
          this.handleAuthentication(resData.user.email, resData.user.token);
        })
    );
  }

  sendProfileData(email: string, firstName: string, secondName: string) {
    const data = {user: {email: email, first_name: firstName, second_name: secondName}};
    return this.http.put(this.API_URL_USER, data).subscribe(
      data => {
        console.log('huy');
        console.log(data);
      },
      error1 => {
        console.log('pixda');
        console.log(error1);
      }
    );
  }

    autoLogin() {
    const userData: {
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthentication(email: string, token: string) {
    const expiresIn = this.getTokenExpirationDate(token);
    const newUser = new User(email, token, new Date(expiresIn));
    this.user.next(newUser);
    const expirationDuration =
      new Date(newUser.expirationDate).getTime() -
      new Date().getTime();
    this.autoLogout(expirationDuration);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/dashboard']);
    localStorage.removeItem('userData');
  }

  getTokenExpirationDate(token: string) {
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    return token_decoded.exp * 1000;
  }

  autoLogout(expirationDuration: number) {

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // public updateData(token) {
  //   this.token = token;
  //   // this.errors = [];
  //
  //   // decode the token to read the username and expiration timestamp
  //   const token_parts = this.token.split(/\./);
  //   const token_decoded = JSON.parse(window.atob(token_parts[1]));
  //   this.tokenExpires = new Date(token_decoded.exp * 1000);
  //   this.username = token_decoded.username;
  // }

}
