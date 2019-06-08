import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {ActivatedRoute, Params, Route} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit {
  nArticles = 0;
  nArticlesInLib = 0;
  nBlogPosts = 0;
  nGitHubs = 0;

  constructor(public apiService: APIService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.apiService.getStats().subscribe(
      data => {
        this.nArticles = data['n_articles'];
        this.nArticlesInLib = data['n_articles_in_lib'];
        this.nBlogPosts = data['n_blog_posts'];
        this.nGitHubs = data['n_githubs'];
      },
      error => console.error('couldn\'t post because', error)
    );
  }

}
