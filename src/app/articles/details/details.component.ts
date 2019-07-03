import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ArticleService} from '../articles.service';
import {Article, ArticleResource} from '../article.model';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../../app.component.css']
})
export class DetailsComponent implements OnInit {

  article: Article;
  relatedArticles: Article[] = [];
  resources: ArticleResource[];
  id: string;
  isAuthenticated = false;
  userSub: Subscription;

  type = 'related';

  nextPage = '';
  error = null;

  constructor(private httpClient: HttpClient, private articleService: ArticleService,
              private route: ActivatedRoute, private authService: AuthService, private titleService: Title) {
  }

  fetchArticle() {
    this.route.params.subscribe(
      params => {
        this.id = params.id;
      }
    );
    this.articleService.fetchArticleDetails(this.id).subscribe(
      data => {
        this.article = data;
        this.resources = data.blog_posts.concat(data.githubs);
        this.resources = this.resources.sort((a, b) => b.rating - a.rating);
        console.log(this.resources);
        this.titleService.setTitle('ML p(r)ior | ' + this.article.title);
      },
      error => console.error('couldn\'t post because', error)
    );
  }

  updateNote(note, article) {
    this.articleService.updateArticle(article, {note: note});
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );


    this.route.params.subscribe(
      (params: Params) => {
        this.articleService.fetchArticleDetails(params.id).subscribe(
          data => {
            this.article = data;
            this.titleService.setTitle('ML p(r)ior | ' + this.article.title);
            this.resources = data.blog_posts.concat(data.githubs);
            this.resources = this.resources.sort((a, b) => b.rating - a.rating);
            console.log(this.resources);
            this.resetArticles();
            this.articleService.fetchArticles(this.type, this.nextPage, {id: this.article.id}).subscribe(
              relatedData => {
                this.relatedArticles = this.relatedArticles.concat(relatedData.results);
                this.nextPage = relatedData.next ? relatedData.next : null;
              },
              error => {
                this.error = error.message;
              }
            );
          },
          error => console.error('couldn\'t post because', error)
        );
      }
    );
  }

  resetArticles(): void {
    this.relatedArticles = [];
    this.nextPage = '';
  }

  onScroll() {
    console.log('scrolled!!');
    console.log(this.nextPage);
    if (!this.nextPage) {
      return;
    }
    this.articleService.fetchArticles(this.type, this.nextPage, {id: this.article.id}).subscribe(
      data => {
        this.relatedArticles = this.relatedArticles.concat(data.results);
        this.nextPage = data.next;
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
