import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from '../articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {TrackingService} from '../../shared/tracking.service';
import {debounceTime, filter, switchMap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormControl = new FormControl();
  isSearchMode = false;
  isLoading = true;

  isAuthenticated = false;
  private userSub: Subscription;

  // @Input() searchQuery = '';

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private trackingService: TrackingService
  ) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    this.searchForm.valueChanges
      .pipe(
        // Фильтруем если введено меньше двух символов
        filter(value => value.length > 2),
        // Ставим задержку одну секунду
        debounceTime(1000),
        // Запрашиваем данные пользователя
      ).subscribe(value => {
            this.router.navigate(['/articles', 'search'], { queryParams: {q: value } });
            this.trackingService.trackSearch();
          }
        );
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        if (params.q && this.searchForm.value === '') {
          this.searchForm.setValue(params.q);
        }
      });
  }

}
