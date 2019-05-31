import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Routes, RouterModule, Router, ActivatedRoute, Params} from '@angular/router';
import {ArticleService} from './articles.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css', '../app.component.css']
})
export class ArticlesComponent implements OnInit {


  constructor(private httpClient: HttpClient, private articleService: ArticleService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        if (params['page'] === 'library' && !this.articleService.isAuthorised()) {
          this.articleService.redirectToLogin();
        }
        this.articleService.resetArticles(params['page']);
        this.articleService.getArticles();
      }
    );




    // let type = this.route.snapshot.params['page'];
    // console.log(type);
    // if (type === 'library' && !this.articleService.isAuthorised()) {
    //   this.articleService.redirectToLogin();
    // }
    //
    // this.articleService.resetArticles(type);
    // this.articleService.getArticles();
  }

  onScroll() {
    console.log('scrolled!!');
    this.articleService.getArticles();
  }



}
