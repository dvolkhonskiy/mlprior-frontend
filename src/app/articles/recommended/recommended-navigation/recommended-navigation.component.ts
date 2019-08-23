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
  lastTime = 'all';
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.last) {
          this.lastTime = params.last;
        }
      });
  }

  onLastButton(last: string) {
    if (this.router.url.includes('popular') || this.router.url.includes('recommended')) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {'last': last}
      });
    } else {
      this.router.navigate(['/', 'articles', 'popular'], {
        relativeTo: this.route,
        queryParams: {'last': last}
      });
    }
  }

  isActiveRoute(last: string) {
    return this.lastTime === last;
  }

}
