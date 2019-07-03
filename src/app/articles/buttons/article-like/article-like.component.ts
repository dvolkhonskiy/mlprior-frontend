import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../article.model';
import {ArticleService} from '../../articles.service';


@Component({
  selector: 'app-articlelike',
  templateUrl: './article-like.component.html',
  styleUrls: ['./article-like.component.css']
})
export class ArticleLikeComponent {
  @Input() article: Article;
  @Input() isAuthenticated: boolean;

  constructor(public articleService: ArticleService) {  }
}
