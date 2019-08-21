import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UserProfile, User} from './user.model';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TrackingService} from '../shared/tracking.service';
import {APIService} from '../shared/api.service';

interface UserResponse {
  email: string;
  token: string;
}

export interface AuthResponseData {
  user: UserResponse;
}

@Injectable()
export class AuthService implements OnInit, OnDestroy {
  user = new BehaviorSubject<User>(null);
  _isAuthenticated = false;
  _is_premium = false;
  private userSub: Subscription;

  private API_URL_LOGIN = environment.baseUrl + 'api/auth/login';
  private API_URL_SIGN_UP = environment.baseUrl + 'api/auth/signup';
  private API_URL_USER = environment.baseUrl + 'api/user';
  API_URL_PROFILE = environment.baseUrl + 'api/profile';
  API_URL_SUBSCRIPTION = environment.baseUrl + 'api/premium';

  public redirectUrl: string;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private trackingService: TrackingService,
              private apiService: APIService
  ) { }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(
      user => {
        this._isAuthenticated = !!user;
        console.log(this.isAuthenticated);
      }
    );
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get isPremium() {
    return this._is_premium;
  }

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
        console.log(data);
      },
      error1 => {
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
      this._isAuthenticated = true;
      this.checkIsPremium();
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
    this._isAuthenticated = true;
    this.checkIsPremium();
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/dashboard']);
    localStorage.removeItem('userData');
    this.trackingService.trackLogOut();
    this._isAuthenticated = false;
    this._is_premium = false;
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

  checkIsPremium() {
    this.apiService.getSubscription().subscribe(
      data => {
        this._is_premium = data.premium;
      }
    );
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

  getProfile() {
    return this.http.get<UserProfile>(this.API_URL_PROFILE);
  }

}
