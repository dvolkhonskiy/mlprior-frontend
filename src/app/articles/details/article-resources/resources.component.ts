import {Component, OnInit, ViewChild} from '@angular/core';
import {DetailsComponent} from '../details.component';
import {ArticleService} from '../../articles.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {ArticleResource} from '../../article.model';
import {debounceTime} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css', '../../../app.component.css']
})
export class ResourcesComponent implements OnInit {
  isCollapsed = true;
  isLoading = false;
  created = true;
  error = '';
  newResourceForm = new FormGroup({
    url: new FormControl(),
    resourceType: new FormControl()
  });

  displayedColumns: string[] = ['type', 'title', 'n_stars', 'framework'];
  dataSource = new MatTableDataSource(this.details.resources);

  panelOpenState = false;

  constructor(public details: DetailsComponent, public articleService: ArticleService) {
  }

  @ViewChild(MatSort, {read: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addResource() {
    this.isLoading = true;
    const resource = this.newResourceForm.value;
    this.articleService.addResource(resource.url, resource.resourceType, this.details.article.id).subscribe(
      data => {
        // this.updateBlogPosts();
        this.newResourceForm.reset();
        // this.details.fetchArticle();
        this.isLoading = false;
        this.error = data['error'];
        setTimeout(() => { this.details.fetchArticle(); }, 5000);
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
      // this.articleService.changeBlogPostLike(resource, !resource.is_like);
    }

    resource.is_like = !resource.is_like;
    resource.rating += resource.is_like ? 1 : -1;
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
