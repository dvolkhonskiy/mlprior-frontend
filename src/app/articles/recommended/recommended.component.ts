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
import {TrackingService} from '../../shared/tracking.service';

@Component({
  selector: 'app-articles',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
  providers: []
})
export class RecommendedComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  nextPage = '';
  error = null;
  type = 'popular';
  searchQuery = '';

  searchForm: FormControl = new FormControl();
  isSearchMode = false;
  isLoading = true;

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private trackingService: TrackingService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    // this.route.url.subscribe(
    //   url =>  {
    //     const path = url[0].path;
    //     this.resetArticles(path);
    //     this.articleService.fetchArticles(this.type, this.nextPage, {}).subscribe(
    //       data => {
    //         this.articles = this.articles.concat(data.results);
    //         this.nextPage = data.next ? data.next : null;
    //         this.isLoading = false;
    //       },
    //       error => {
    //         this.error = error.message;
    //       }
    //     );
    //   }
    // );

    this.searchForm.valueChanges
      .pipe(
        // Фильтруем если введено меньше двух символов
        filter(value => value.length > 2),
        // Ставим задержку одну секунду
        debounceTime(1000),
        // Запрашиваем данные пользователя
      ).subscribe(value => {
        this.router.navigate(['/articles', 'search'], {queryParams: {q: value}});
        // if (!this.isSearchMode) {
        //   this.nextPage = '';
        // }
        // this.isSearchMode = true;
        // this.isLoading = true;
        // this.searchQuery = value;
        // this.resetArticles('search');
        this.trackingService.trackSearch();
        // return this.articleService.fetchArticles('search',
        //   1, {
        //     q: value
        //   });
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
