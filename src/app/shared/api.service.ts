import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {PremiumSubscription} from '../premium/subscription.model';

@Injectable()
export class APIService {

  API_URL_STATS = environment.baseUrl + 'api/stats';
  API_URL_TREND = environment.baseUrl + 'api/visualization/trends';
  API_URL_CATEG = environment.baseUrl + 'api/visualization/categories';
  API_URL_FEEDBACK = environment.baseUrl + 'api/feedback';
  API_URL_PREMIUM = environment.baseUrl + 'api/premium';

  constructor(private httpClient: HttpClient) {  }

  switchToPremium() {
    return this.httpClient.post(this.API_URL_PREMIUM, {});
  }

  getSubscription() {
    return this.httpClient.get<PremiumSubscription>(this.API_URL_PREMIUM);
  }

  updateSubscription(subscription: PremiumSubscription) {
    return this.httpClient.put(this.API_URL_PREMIUM, subscription);
  }

  getStats(): any {
    return this.httpClient.get(this.API_URL_STATS);
  }

  getTrends(keywords): any {
    if (keywords === "") {
      return this.httpClient.get(this.API_URL_TREND);
    }

    const url = this.API_URL_TREND + "?keywords=" + keywords;
    return this.httpClient.get(url);
  }

  getCategories(categories) {
    if (categories === "") {
      return this.httpClient.get(this.API_URL_CATEG);
    }

    const url = this.API_URL_CATEG + "?categoriesForm=" + categories;
    return this.httpClient.get(url);
  }

  sendFeedback(feedback: string, name: string, email: string, type: number) {
    const body = {
      name: name,
      message: feedback,
      email: email,
      type: type
    };

    return this.httpClient.post(this.API_URL_FEEDBACK, body);
  }
}
