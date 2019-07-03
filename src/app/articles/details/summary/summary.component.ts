import {Component, Input, OnInit} from '@angular/core';
import {ArticleResource, SummarySentence} from '../../article.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../../../app.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() summary: SummarySentence[] = [{text: 'lol', id: '1', isLike: true }, {text: 'kek', id: '1'}, {text: 'pip', id: '1'}];
  constructor() { }

  onClick(sentence) {
    sentence.isLike = !sentence.isLike;
  }

  ngOnInit() {
  }

}
