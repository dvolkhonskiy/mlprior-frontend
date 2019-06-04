import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

// import {AuthService} from './_user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mlprior-frontend';

  constructor(private router: Router, private authService: AuthService) {  }

  ngOnInit() {
    this.authService.autoLogin();

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

  isLibrary(): boolean {
    return (this.router.url.includes('library')
      || this.router.url.includes('liked')
      || this.router.url.includes('disliked')
    );
  }
}
