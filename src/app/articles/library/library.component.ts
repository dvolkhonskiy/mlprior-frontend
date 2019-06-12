import { Component, OnInit } from '@angular/core';
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
        console.log(path);
        this.resetArticles(path);
        this.articleService.fetchArticles(this.type, this.nextPage, {}).subscribe(
          data => {
            this.articles = this.articles.concat(data.results);
            this.nextPage = data.next ? data.next : null;

            console.log(data);
          },
          error => {
            this.error = error.message;
          }
        );
      }
    );
  }

  updateNote(note, article) {
    this.articleService.updateArticle(article, {note: note});
  }

  resetArticles(type): void {
    this.articles = [];
    this.nextPage = '';
    this.type = type;
  }

  onScroll() {
    console.log('scrolled!!');
    if (this.nextPage == null) {
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
