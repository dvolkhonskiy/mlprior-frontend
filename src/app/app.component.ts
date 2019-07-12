import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {Title} from '@angular/platform-browser';
import {filter, mergeMap, map} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

// import {AuthService} from './_user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mlprior-frontend';
  isLanding = true;

  constructor(private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              @Inject(PLATFORM_ID) private platformId
  ) {  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin();
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.isLanding = evt.url === '/';
      // window.scrollTo(0, 0);
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {route = route.firstChild; }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)).subscribe((event) => this.titleService.setTitle('ML p(r)ior | ' + event['title']));

  }

  public isArticles(): boolean {
    return (this.router.url.includes('recommended')
      || this.router.url.includes('recent')
      || this.router.url.includes('popular')
      || this.router.url.includes('details')
      || this.router.url.includes('author')
    );
  }

  isLibrary(): boolean {
    return (this.router.url.includes('library')
      || this.router.url.includes('liked')
      || this.router.url.includes('disliked')
    );
  }
}
