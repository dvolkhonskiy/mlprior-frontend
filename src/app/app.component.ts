import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';

// import {AuthService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mlprior-frontend';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  public isArticles(): boolean {
    return (this.router.url.includes('recommended')
      || this.router.url.includes('recent')
      || this.router.url.includes('popular')
      || this.router.url.includes('details')
    );
  }
}
