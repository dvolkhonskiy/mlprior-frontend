import { Component, OnInit } from '@angular/core';
import {ArticlesListComponent} from '../articles-list.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(public articleList: ArticlesListComponent) { }

  ngOnInit() {
  }

}
