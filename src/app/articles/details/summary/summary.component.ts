import {Component, Input, OnInit} from '@angular/core';
import {ArticleResource, SummarySentence} from '../../article.model';
import {forkJoin} from 'rxjs';
import {ArticleService} from '../../articles.service';
import {error} from '@angular/compiler/src/util';
import {TrackingService} from '../../../shared/tracking.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../../../app.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() summary: SummarySentence[];
  isFeedbackSent = false;
  error = '';
  @Input() collapsed: boolean;
  constructor(private articleService: ArticleService,
              private trackingService: TrackingService,
              public authService: AuthService
  ) { }

  setLikeToSummarySentence(sentence: SummarySentence) {
    sentence.isLike = !sentence.isLike;
    sentence.nLikes += sentence.isLike ? 1 : -1;
  }

  showSummary() {
    this.collapsed = !this.collapsed;
    this.trackingService.trackOpenSummary();
  }

  sendFeedbackAboutSummary(summary) {
    console.log('Sending feedback');
    console.log(summary);

    const kek = summary.map(sentence => {
      return this.articleService.sendSummaryFeedback(sentence.sentence, sentence.id, sentence.isLike);
    });

    forkJoin(kek).subscribe(
      data => {
        this.isFeedbackSent = true;

      },
      error1 => {
        this.error = error1;
      }
    );
  }

  ngOnInit() {
  }

}
