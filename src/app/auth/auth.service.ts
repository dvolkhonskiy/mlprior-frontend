import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  // http options used for making API calls
  private httpOptions: any;
  private loginUrl = 'http://localhost:8000/users/login';
  // the actual JWT token
  public token = '';

  // the token expiration date
  public tokenExpires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user) {
    console.log(JSON.stringify(user));
    this.http.post(this.loginUrl, user, this.httpOptions).subscribe(
      data => {
        this.updateData(data['user']['token']);
        console.log(this.token);
      },
      err => {
        console.log(err.error);
        this.errors = err.error;
      }
    );
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        resolve(this.token !== '');
      }
    );

    return promise;
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['user']['token']);
      },
      err => {
        this.errors = err.error;
      }
    );
  }

  public logout() {
    this.token = null;
    this.tokenExpires = null;
    this.username = null;
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.tokenExpires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

}
