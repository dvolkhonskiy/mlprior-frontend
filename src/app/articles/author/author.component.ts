import { Component, OnInit } from '@angular/core';
import {Article} from '../article.model';
import {Subscription} from 'rxjs';
import {ArticleService} from '../articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  articles: Article[] = [];
  isAuthenticated = false;
  private userSub: Subscription;

  nextPage = '';
  error = null;
  type = 'author';

  name: string;

  constructor(public articleService: ArticleService,
              public route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.name = params.name;
        this.titleService.setTitle('ML p(r)ior | ' + this.name);
      }
    );
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    this.articleService.fetchArticles(this.type, this.nextPage, {name: this.name}).subscribe(
      data => {
        this.articles = this.articles.concat(data.results);
        this.nextPage = data.next ? data.next : null;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  onScroll() {
    console.log('scrolled!!');
    if (!this.nextPage) {
      return;
    }
    this.articleService.fetchArticles(this.type, this.nextPage, {name: this.name}).subscribe(
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
