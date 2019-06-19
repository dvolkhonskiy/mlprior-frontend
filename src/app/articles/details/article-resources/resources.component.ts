import {Component, OnInit} from '@angular/core';
import {DetailsComponent} from '../details.component';
import {ArticleService} from '../../articles.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {ArticleResource} from '../../article.model';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-githubs',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css', '../../../app.component.css']
})
export class ResourcesComponent implements OnInit {
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
    this.articleService.addResource(github.url, this.details.article.id).subscribe(
      data => {
        // this.updateBlogPosts();
        this.newGitHubForm.reset();
        this.details.fetchArticle();
        this.isLoading = false;
        this.error = data['error'];
        setTimeout(() => { this.details.fetchArticle(); }, 10000);
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  changResourceLike(resource: ArticleResource) {
    if (resource.type === 'github') {
      this.articleService.changeGitHubLike(resource, !resource.is_like);
    } else {
      this.articleService.changeBlogPostLike(resource, !resource.is_like);
    }

    resource.is_like = !resource.is_like;
    resource.rating += resource.is_like ? 1 : -1;
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
