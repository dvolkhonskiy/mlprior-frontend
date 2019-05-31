import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class ArticleService {

  articles = [];
  article = {};
  firstPageRecommended = environment.baseUrl + 'api/articles/recommended?page=1';
  firstPageRecent = environment.baseUrl + 'api/articles/recent?page=1';
  firstPagePopular = environment.baseUrl + 'api/articles/popular?page=1';
  firstPageLibrary = environment.baseUrl + 'api/articles/library?page=1';
  API_URL_ARTICLE_DETAILS = environment.baseUrl + 'api/articles/details/';
  API_URL_BLOGPOSTS = environment.baseUrl + 'api/blogposts/';
  nextPage = this.firstPageRecommended;

  typeToURL = {
    recommended: this.firstPageRecommended,
    recent: this.firstPageRecent,
    popular: this.firstPagePopular,
    library: this.firstPageLibrary,
  };


  constructor(private httpClient: HttpClient, private router: Router, private _authService: AuthService) {  }

  resetArticles(type): void {
    this.articles = [];
    this.nextPage = this.typeToURL[type];
  }

  isAuthorised(): boolean {
    return this._authService.token !== '';
  }

  redirectToLogin(): void {
    this.router.navigate(['signin']);
  }

  updateArticle(article, update): void {
    if (!this.isAuthorised()) {
      this.redirectToLogin();
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    this.httpClient.put(environment.baseUrl + 'api/articles/library/' + article.id + '/', update, httpOptions).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  updateBlogPost(blogpost, update): void {


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    this.httpClient.put(this.API_URL_BLOGPOSTS + blogpost.id + '/', update, httpOptions).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  addBlogPost(blogpost): void {
    if (!this.isAuthorised()) {
      this.redirectToLogin();
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    this.httpClient.post(this.API_URL_BLOGPOSTS, blogpost, httpOptions).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  addRemoveFromLib(article): void {
    this.updateArticle(article, {
      in_lib: !article.in_lib
    });
    article.in_lib = !article.in_lib;
    console.log(article);
  }

  likeDislike(article, likeDislike): void {
    this.updateArticle(article, {
      like_dislike: likeDislike
    });
    article.like_dislike = likeDislike;
  }

  changeBlogPostLike(blogpost, isLike): void {
    this.updateBlogPost(blogpost, {
      is_like: isLike
    });
  }

  getArticles(): void {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    this.httpClient.get(this.nextPage, httpOptions).subscribe(
      data => {
        console.log(data);
        this.articles = this.articles.concat(data['results']);
        console.log(this.articles);
        this.nextPage = data['next'];
      },
      error => console.error('couldn\'t post because', error)
    );
  }

  getArticle(id) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._authService.token
      })
    };

    return this.httpClient.get(this.API_URL_ARTICLE_DETAILS + id, httpOptions).pipe( tap(res => {return res; }));
  }

}
