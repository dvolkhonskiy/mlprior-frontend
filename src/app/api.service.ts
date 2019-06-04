import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment';

@Injectable()
export class APIService {

  API_URL_STATS = environment.baseUrl + "api/stats";
  API_URL_TREND = environment.baseUrl + "api/visualization/trends";
  API_URL_CATEG = environment.baseUrl + "api/visualization/categories";

  // STATISTICS
  nArticles = 0;
  nArticlesInLib = 0;
  nBlogPosts = 0;
  nGitHubs = 0;

  constructor(private httpClient: HttpClient, private router: Router, private _authService: AuthService) {
  }


  getStats(): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    // let stats = {};

    this.httpClient.get(this.API_URL_STATS, httpOptions).subscribe(
      data => {
        this.nArticles = data['n_articles'];
        this.nArticlesInLib = data['n_articles_in_lib'];
        this.nBlogPosts = data['n_blog_posts'];
        this.nGitHubs = data['n_githubs'];
      },
      error => console.error('couldn\'t post because', error)
    );

  }

  getTrends(keywords, component): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    let url = this.API_URL_TREND + "?keywords=" + keywords;
    this.httpClient.get(url, httpOptions).subscribe(
      data => {
        component.trendInfo = data['data'];
      },
      error => console.error('couldn\'t post because', error)
    );
  }

  getCategories(categories, component): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    let url = this.API_URL_CATEG + "?categories=" + categories;
    this.httpClient.get(url, httpOptions).subscribe(
      data => {
        component.categoryInfo = data['data'];
      },
      error => console.error('couldn\'t post because', error)
    );
  }
}
