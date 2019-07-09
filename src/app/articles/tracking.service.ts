import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class TrackingService {
  API_URL_TRACK = environment.baseUrl + 'api/mplog';

  constructor(private http: HttpClient) { }

  trackAction(action: string) {
    return this.http.post(this.API_URL_TRACK, {action: action});
  }

  trackOpenSummary() {
    return this.trackAction('SHOW article.summary');
  }

  trackOpenPDF() {
    return this.trackAction('OUT article.pdf');
  }

  trackOpenRelated() {
    return this.trackAction('SHOW article.related');
  }
}
