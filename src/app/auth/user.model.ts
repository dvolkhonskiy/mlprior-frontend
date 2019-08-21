import {PremiumSubscription} from '../premium/subscription.model';

export class User {
  constructor(public email: string, private _token: string, private _tokenExpirationDate: Date) {   }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get expirationDate() {
    return this._tokenExpirationDate;
  }
}

export interface UserProfile {
  first_name: string;
  second_name: string;
}
