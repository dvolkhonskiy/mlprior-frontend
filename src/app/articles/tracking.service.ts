import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class TrackingService {
  API_URL_TRACK = environment.baseUrl + 'api/mplog';

  constructor(private http: HttpClient) { }

  trackAction(action: string) {
    this.http.post(this.API_URL_TRACK, {action: action}).subscribe(
      data =>  console.log(data),
      error1 => console.error(error1)
    );
  }

  trackOpenSummary() {
    this.trackAction('SHOW article.summary');
  }

  trackOpenPDF() {
    this.trackAction('OUT article.pdf');
  }

  trackOpenRelated() {
    this.trackAction('SHOW article.related');
  }
}
