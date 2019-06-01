import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {tap, map} from 'rxjs/operators';

import {Article, BlogPost, GitHub, ArticleAuthor} from './article.model';

@Injectable()
export class ArticleService {

  articles: Article[] = [];
  article: Article;
  API_URL_FIRST_PAGE_RECOMMENDED = environment.baseUrl + 'api/articles/recommended?page=1';
  API_URL_FIRST_PAGE_RECENT = environment.baseUrl + 'api/articles/recent?page=1';
  API_URL_FIRST_PAGE_POPULAR = environment.baseUrl + 'api/articles/popular?page=1';
  API_URL_FIRST_PAGE_LIBRARY = environment.baseUrl + 'api/articles/library?page=1';

  API_URL_ARTICLE_DETAILS = environment.baseUrl + 'api/articles/details/';
  API_URL_ARTICLE_LIBRARY = environment.baseUrl + 'api/articles/library/';
  API_URL_BLOGPOSTS = environment.baseUrl + 'api/blogposts/';

  nextPage = this.API_URL_FIRST_PAGE_RECOMMENDED;

  typeToURL = {
    recommended: this.API_URL_FIRST_PAGE_RECOMMENDED,
    recent: this.API_URL_FIRST_PAGE_RECENT,
    popular: this.API_URL_FIRST_PAGE_POPULAR,
    library: this.API_URL_FIRST_PAGE_LIBRARY,
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + this.authService.token
    })
  };


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {  }

  resetArticles(type): void {
    this.articles = [];
    this.nextPage = this.typeToURL[type];
  }

  isAuthorised(): boolean {
    return this.authService.token !== '';
  }

  redirectToLogin(): void {
    this.router.navigate(['signin']);
  }

  updateArticle(article, update): void {
    if (!this.isAuthorised()) {
      this.redirectToLogin();
    }

    this.http.put(this.API_URL_ARTICLE_LIBRARY + article.id + '/', update, this.httpOptions).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  updateBlogPost(blogpost, update): void {
    this.http.put(this.API_URL_BLOGPOSTS + blogpost.id + '/', update, this.httpOptions).subscribe(
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

    this.http.post(this.API_URL_BLOGPOSTS, blogpost, this.httpOptions).subscribe(
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
    this.http.get<{results: Article[], next: string, previous: string}>(this.nextPage, this.httpOptions).subscribe(
      data => {
        this.articles = this.articles.concat(data.results);
        this.nextPage = data.next;
      },
      error => console.error('couldn\'t get articles because', error)
    );
  }

  getArticle(id) {
    return this.http.get<Article>(this.API_URL_ARTICLE_DETAILS + id, this.httpOptions).pipe( tap(res => {return res; }));
  }

}
