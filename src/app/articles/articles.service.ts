import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {tap, map, take, exhaustMap} from 'rxjs/operators';

import {Article, BlogPost, GitHub, ArticleAuthor} from './article.model';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {Subscription} from 'rxjs';

@Injectable()
export class ArticleService implements OnInit {


  article: Article;
  API_URL_ARTICLES_LIST = environment.baseUrl + 'api/articles/';

  API_URL_ARTICLE_DETAILS = environment.baseUrl + 'api/articles/details/';
  API_URL_ARTICLE_LIBRARY = environment.baseUrl + 'api/articles/saved/';
  API_URL_BLOGPOSTS = environment.baseUrl + 'api/blogposts/';
  API_URL_GITHUBS = environment.baseUrl + 'api/githubs/';

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {

  }

  // redirectIfNotAuthenticated() {
  //   console.log(this.isAuthenticated);
  //   if (!this.isAuthenticated) {
  //     this.router.navigate(['/login']);
  //   }
  // }


  updateArticle(article, update): void {
    // this.redirectIfNotAuthenticated();
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

  addBlogPost(title: string, url: string, articleId: string) {
    const blogpost = {
      title: title,
      url: url,
      article_id: articleId
    };
    return this.http.post(this.API_URL_BLOGPOSTS, blogpost);
  }

  addGitHub(url: string, articleId: string) {
    const github = {
      url: url,
      article_id: articleId
    };
    return this.http.post(this.API_URL_GITHUBS, github);
  }

  updateGitHub(github, update) {
    this.http.put(this.API_URL_GITHUBS + github.id + '/', update).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  changeGitHubLike(github, isLike): void {
    // this.redirectIfNotAuthenticated();
    this.updateGitHub(github, {
      is_like: isLike
    });
  }

  addRemoveFromLib(article): void {
    // this.redirectIfNotAuthenticated();
    this.updateArticle(article, {
      in_lib: !article.in_lib
    });
    article.in_lib = !article.in_lib;
  }

  likeDislike(article, likeDislike, isAuthenticated): void {
    if (!isAuthenticated) {
      return;
    }
    this.updateArticle(article, {
      like_dislike: likeDislike
    });
    article.like_dislike = likeDislike;
  }

  changeBlogPostLike(blogpost, isLike): void {
    // this.redirectIfNotAuthenticated();
    this.updateBlogPost(blogpost, {
      is_like: isLike
    });
  }

  fetchArticles(type: string, page: string) {
    const url = page === '' ? this.API_URL_ARTICLES_LIST + type + '?page=1' : page;
    return this.http.get<{ results: Article[], next?: string, previous: string }>(url);
  }

  fetchArticleDetails(id) {
    return this.http.get<Article>(this.API_URL_ARTICLE_DETAILS + id).pipe(tap(res => {
      return res;
    }));
  }

}
