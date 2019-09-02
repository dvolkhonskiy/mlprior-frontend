import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ArticleService} from '../articles.service';
import {Article, ArticleResource} from '../article.model';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {TrackingService} from '../../shared/tracking.service';
import {LoginDialogService} from '../../auth/login-dialog.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../../app.component.css']
})
export class DetailsComponent implements OnInit {

  article: Article;
  // relatedArticles: Article[] = [];
  resources: ArticleResource[];
  id: string;
  isAuthenticated = false;
  userSub: Subscription;

  type = 'related';
  showRelated = false;

  nextPage = '';
  error = null;

  constructor(private httpClient: HttpClient, private articleService: ArticleService,
              private route: ActivatedRoute, private authService: AuthService, private titleService: Title,
              private trackingService: TrackingService, public loginDialog: LoginDialogService) {
  }

  onShowRelated() {
    this.showRelated = true;
    this.trackingService.trackOpenRelated();
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
        this.resources = data.resources;
        this.resources.sort(
          (a, b) => {
            // pretend non-github resources have 1000 stars
            const aStars = a.type === 'github' ? a.n_stars : 1000;
            const bStars = b.type === 'github' ? b.n_stars : 1000;
            return bStars - aStars;
          }
        );
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
            console.log(this.article);
            this.titleService.setTitle('ML p(r)ior | ' + this.article.title);
            this.resources = data.resources;
            this.resources.sort(
              (a, b) => {
                // pretend non-github resources have 1000 stars
                const aStars = a.type === 'github' ? a.n_stars : 1000;
                const bStars = b.type === 'github' ? b.n_stars : 1000;
                return bStars - aStars;
              }
            );
          },
          error => console.error('couldn\'t post because', error)
        );
      }
    );

    // this.onScroll();
  }

  resetArticles(): void {
    // this.relatedArticles = [];
    this.nextPage = '';
    this.showRelated = false;
  }

  // onScroll() {
  //   console.log('scrolled!!');
  //   console.log(this.nextPage);
  //   if (!this.nextPage) {
  //     return;
  //   }
  //   this.articleService.fetchArticles(this.type, this.nextPage, {articleId: this.article.articleId}).subscribe(
  //     data => {
  //       this.relatedArticles = this.relatedArticles.concat(data.results);
  //       this.nextPage = data.next;
  //     },
  //     error => {
  //       this.error = error.message;
  //     }
  //   );
  // }
}
