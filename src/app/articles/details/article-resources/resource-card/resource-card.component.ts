import {Component, Input, OnInit} from '@angular/core';
import {ArticleResource} from '../../../article.model';
import {ResourcesComponent} from '../resources.component';

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent implements OnInit {
  @Input() resource: ArticleResource;
  constructor(public resources: ResourcesComponent) { }

  ngOnInit() {
  }

}
