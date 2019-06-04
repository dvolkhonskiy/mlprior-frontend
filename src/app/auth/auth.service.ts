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

interface AuthResponseData {
  "user": UserResponse;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private API_URL_LOGIN = environment.baseUrl + 'api/auth/login';
  private API_URL_SIGN_UP = environment.baseUrl + 'api/auth/signUp';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    let data = { user: { email: email, password: password}};
    return this.http.post<AuthResponseData>(this.API_URL_SIGN_UP, data).pipe(
      tap( resData => { this.handleAuthentication(resData.user.email, resData.user.token); } )
    );
  }

  login(email: string, password: string) {
    let data = {"user": {"email": email, "password":  password}};
    console.log(data);
    return this.http.post<AuthResponseData>(this.API_URL_LOGIN, data).pipe(
      tap(
        resData => {
          this.handleAuthentication(resData.user.email, resData.user.token);
        })
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

    console.log(userData);
    const loadedUser = new User(userData.email, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(email: string, token: string) {
    const expirationDate = this.getTokenExpirationDate(token);
    console.log(email, token, expirationDate);
    const newUser = new User(email, token, expirationDate);
    this.user.next(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/dashboard']);
  }

  getTokenExpirationDate(token: string) {
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    console.log('expires');
    console.log(token_decoded);
    return new Date(token_decoded.exp * 1000);
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
