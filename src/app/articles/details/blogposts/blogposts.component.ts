import {Component, OnInit} from '@angular/core';
import {DetailsComponent} from '../details.component';
import {ArticleService} from '../../articles.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.css', '../../../app.component.css']
})
export class BlogpostsComponent implements OnInit {

  isCollapsed = true;
  created = true;
  newBlogPostForm = new FormGroup({
    title: new FormControl(),
    url: new FormControl()
  });

  // newBlogPost = {url: String, title: String};

  constructor(public details: DetailsComponent, public articleService: ArticleService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newBlogPostForm.valueChanges.subscribe(

    );
  }

  addBlogPost() {
    let blogpost = this.newBlogPostForm.value;
    blogpost.article_id = this.details.article['id'];
    this.articleService.addBlogPost(JSON.stringify(blogpost));
  }

  changBlogPostLike(blogpost) {
    this.articleService.changeBlogPostLike(blogpost, !blogpost.is_like);
    blogpost.is_like = !blogpost.is_like;
  }

}
