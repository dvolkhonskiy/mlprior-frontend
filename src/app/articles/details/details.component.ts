import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ArticleService} from '../articles.service';
import {Article} from '../article.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../../app.component.css']
})
export class DetailsComponent implements OnInit {

  article: Article;

  constructor(private httpClient: HttpClient, private articleService: ArticleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.articleService.fetchArticleDetails(params.id).subscribe(
          data => {
            this.article = data;
          },
          error => console.error('couldn\'t post because', error)
        );
      }
    );
  }
}
