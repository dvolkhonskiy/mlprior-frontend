import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RecommendedComponent} from '../recommended.component';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './recommended-navigation.component.html',
  styleUrls: ['./recommended-navigation.component.css', '../../../app.component.css']
})
export class RecommendedNavigationComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {  }

}
