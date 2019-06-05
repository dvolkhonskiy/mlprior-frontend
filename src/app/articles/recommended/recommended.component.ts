import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ArticleService} from '../articles.service';
import {Article} from '../article.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css', '../../app.component.css'],
  providers: []
})
export class RecommendedComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  nextPage = '';
  error = null;
  type = 'recommended';

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(public articleService: ArticleService, public route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        console.log('user');
        console.log(!!user);
        this.isAuthenticated = !!user;
      }
    );

    this.route.url.subscribe(
      url =>  {
        const path = url[0].path;
        this.resetArticles(path);
        this.articleService.fetchArticles(this.type, this.nextPage).subscribe(
          data => {
            this.articles = this.articles.concat(data.results);
            this.nextPage = data.next ? data.next : null;
          },
          error => {
            this.error = error.message;
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  resetArticles(type): void {
    this.articles = [];
    this.nextPage = '';
    this.type = type;
  }

  onScroll() {
    console.log('scrolled!!');
    if (!this.nextPage) {
      return;
    }
    this.articleService.fetchArticles(this.type, this.nextPage).subscribe(
      data => {
        this.articles = this.articles.concat(data.results);
        this.nextPage = data.next;
      },
      error => {
        this.error = error.message;
      }
    );
  }

}
