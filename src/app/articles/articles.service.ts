import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {tap, map, take, exhaustMap} from 'rxjs/operators';

import {Article, BlogPost, GitHub, ArticleAuthor} from './article.model';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable()
export class ArticleService {


  article: Article;
  API_URL_ARTICLES_LIST = environment.baseUrl + 'api/articles/';

  API_URL_ARTICLE_DETAILS = environment.baseUrl + 'api/articles/details/';
  API_URL_ARTICLE_LIBRARY = environment.baseUrl + 'api/articles/library/';
  API_URL_BLOGPOSTS = environment.baseUrl + 'api/blogposts/';
  //
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'JWT ' + this.authService.token
  //   })
  // };


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }


  updateArticle(article, update): void {
    this.http.put(this.API_URL_ARTICLE_LIBRARY + article.id + '/', update).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  updateBlogPost(blogpost, update): void {
    this.http.put(this.API_URL_BLOGPOSTS + blogpost.id + '/', update).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  addBlogPost(blogpost): void {
    // if (!this.isAuthorised()) {
    //   this.redirectToLogin();
    // }

    this.http.post(this.API_URL_BLOGPOSTS, blogpost).subscribe(
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

  fetchArticles(type: string, page: string) {

    const url = page === '' ? this.API_URL_ARTICLES_LIST + type + '?page=1' : page;
    return this.http.get<{ results: Article[], next: string, previous: string }>(url);

  }

  fetchArticleDetails(id) {
    return this.http.get<Article>(this.API_URL_ARTICLE_DETAILS + id).pipe(tap(res => {
      return res;
    }));
  }

}
