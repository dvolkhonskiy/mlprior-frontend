import {Component, Input, OnInit} from '@angular/core';
import {GitHub} from '../../../article.model';
import {ResourcesComponent} from '../resources.component';

@Component({
  selector: 'app-github-card',
  templateUrl: './github-card.component.html',
  styleUrls: ['./github-card.component.css']
})
export class GithubCardComponent implements OnInit {
  @Input() github: GitHub;
  constructor(private githubs: ResourcesComponent) { }

  ngOnInit() {
  }

}
