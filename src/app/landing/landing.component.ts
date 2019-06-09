import { Component, OnInit } from '@angular/core';
import {APIService} from '../shared/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['../../assets/css/material-kit.css',  './landing.component.css']
})
export class LandingComponent implements OnInit {

  nArticles = 0;
  nBlogPosts = 0;
  nGitHubs = 0;

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getStats().subscribe(
      data => {
        this.nArticles = data['n_articles'];
        this.nBlogPosts = data['n_blog_posts'];
        this.nGitHubs = data['n_githubs'];
      },
      error => console.error('couldn\'t post because', error)
    );
  }
}
