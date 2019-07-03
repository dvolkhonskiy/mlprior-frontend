import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Article} from '../article.model';
import {ArticleService} from '../articles.service';
import {FocusMonitor} from '@angular/cdk/a11y';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit, AfterViewInit {
  @Input() article: Article;
  @Input() isAuthenticated: boolean;

  constructor(private articleService: ArticleService,
              private focusMonitor: FocusMonitor) { }

  updateNote(note, article) {
    this.articleService.updateArticle(article, {note: note});
  }

  ngAfterViewInit() {
    // this.focusMonitor.stopMonitoring(document.getElementsByTagName('mat-icon-button'));
  }

  ngOnInit() { }

}
