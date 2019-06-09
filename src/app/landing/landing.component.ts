import { Component, OnInit } from '@angular/core';
import {APIService} from '../shared/api.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthResponseData} from '../auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['../../assets/css/material-kit.css',  './landing.component.css']
})
export class LandingComponent implements OnInit {

  nArticles = 0;
  nBlogPosts = 0;
  nGitHubs = 0;
  isSuccess = false;

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getStats().subscribe(
      data => {
        this.nArticles = data.n_articles;
        this.nBlogPosts = data.n_blog_posts;
        this.nGitHubs = data.n_githubs;
      },
      error => console.error('couldn\'t post because', error)
    );
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const name = form.value.name;
    const message = form.value.text;

    this.apiService.sendFeedback(message, name, email, 1).subscribe(
      data => {
        this.isSuccess = true;
      },
      error => {
        console.error(error);
      }
    );
    form.reset();
  }
}
