import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ArticleService} from '../articles.service';
import {Article} from '../article.model';
import {Subscription} from 'rxjs';
import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import {not} from 'rxjs/internal-compatibility';
import {FormControl} from '@angular/forms';

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

  searchForm: FormControl = new FormControl();
  isSearchMode = false;

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(public articleService: ArticleService, public route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    this.route.url.subscribe(
      url =>  {
        const path = url[0].path;
        this.resetArticles(path);
        this.articleService.fetchArticles(this.type, this.nextPage, {}).subscribe(
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

    this.searchForm.valueChanges
      .pipe(
        // Фильтруем если введено меньше двух символов
        filter(value => value.length > 2),
        // Ставим задержку одну секунду
        debounceTime(1000),
        // Запрашиваем данные пользователя
        switchMap(value => {
            if (!this.isSearchMode) {
              this.nextPage = '';
            }
            this.isSearchMode = true;
            this.resetArticles('search');
            return this.articleService.fetchArticles('search', this.nextPage, {q: value});
          }
          )
      )
      // Получение данных
      .subscribe(articles => {
        this.resetArticles('search');
        console.log(articles);
        this.articles = articles.results;
        this.nextPage = articles.next;
      });
  }

  updateNote(note, article) {
    this.articleService.updateArticle(article, {note: note});
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
    this.articleService.fetchArticles(this.type, this.nextPage, {}).subscribe(
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
