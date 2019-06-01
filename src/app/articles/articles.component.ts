import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';
import {ArticleService} from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css', '../app.component.css'],
  providers: [

  ]
})
export class ArticlesComponent implements OnInit {
  articles: {}[] = [];

  constructor(private httpClient: HttpClient, public articleService: ArticleService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.articleService.resetArticles(params.page);
        this.articleService.getArticles();
      }
    );
  }

  onScroll() {
    console.log('scrolled!!');
    this.articleService.getArticles();
  }



}
