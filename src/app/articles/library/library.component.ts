import { Component, OnInit } from '@angular/core';
import {ArticlesComponent} from '../articles.component';
import {Article} from '../article.model';
import {ArticleService} from '../articles.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css', '../../app.component.css']
})
export class LibraryComponent implements OnInit {

  articles: Article[] = [];
  nextPage = '';
  error = null;
  type = 'recommended';

  constructor(public articleService: ArticleService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe(
      url =>  {
        const path = url[0].path;
        this.resetArticles(path);
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
