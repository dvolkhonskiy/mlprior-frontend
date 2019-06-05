import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './recommended-navigation.component.html',
  styleUrls: ['./recommended-navigation.component.css', '../../../app.component.css']
})
export class RecommendedNavigationComponent implements OnInit {
  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {  }

}
