import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';
import {ArticleService} from './articles.service';
import {Article} from './article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css', '../app.component.css'],
  providers: []
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  nextPage = '';
  error = null;
  type = 'recommended';

  constructor(public articleService: ArticleService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.resetArticles(params.page);
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
    );
  }

  resetArticles(type): void {
    this.articles = [];
    this.nextPage = '';
    this.type = type;
  }

  onScroll() {
    console.log('scrolled!!');
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
