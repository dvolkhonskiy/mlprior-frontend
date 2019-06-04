export class User {
  constructor(public email: string, private _token: string, private _tokeExpirationDate: Date) {   }

  get token() {
    if (!this._tokeExpirationDate || new Date() > this._tokeExpirationDate) {
      return null;
    }
    return this._token;
  }
}
