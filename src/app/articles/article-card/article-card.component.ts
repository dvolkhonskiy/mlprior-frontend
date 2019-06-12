import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../article.model';
import {ArticleService} from '../articles.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  @Input() isAuthenticated: boolean;

  constructor(private articleService: ArticleService) { }

  updateNote(note, article) {
    this.articleService.updateArticle(article, {note: note});
  }

  ngOnInit() {
  }

}
