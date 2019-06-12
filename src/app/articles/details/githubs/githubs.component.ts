import {Component, OnInit} from '@angular/core';
import {DetailsComponent} from '../details.component';
import {ArticleService} from '../../articles.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-githubs',
  templateUrl: './githubs.component.html',
  styleUrls: ['./githubs.component.css', '../../../app.component.css']
})
export class GithubsComponent implements OnInit {
  isCollapsed = true;
  isLoading = false;
  created = true;
  error = '';
  newGitHubForm = new FormGroup({
    url: new FormControl()
  });

  panelOpenState = false;

  constructor(public details: DetailsComponent, public articleService: ArticleService) {
  }

  ngOnInit() {
  }

  addGitHub() {
    this.isLoading = true;
    const github = this.newGitHubForm.value;
    this.articleService.addGitHub(github.url, this.details.article.id).subscribe(
      data => {
        // this.updateBlogPosts();
        this.newGitHubForm.reset();
        this.details.fetchArticle();
        this.isLoading = false;
        this.error = data['error'];
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  changGitHubLike(github) {
    this.articleService.changeGitHubLike(github, !github.is_like);
    github.is_like = !github.is_like;
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
