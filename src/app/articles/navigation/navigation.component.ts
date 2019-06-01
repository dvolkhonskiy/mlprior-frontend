import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css', '../../app.component.css']
})
export class NavigationComponent implements OnInit {
  isArticlesPage: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isArticlesPage = !['library', 'liked', 'disliked'].includes(this.route.params['page']);
  }

}
