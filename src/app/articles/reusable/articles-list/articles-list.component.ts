import {Component, Input, OnInit} from '@angular/core';
import {Article, ArticleQueryParams} from '../../article.model';
import {ArticleService} from '../../articles.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {TrackingService} from '../../../shared/tracking.service';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  type: string;
  name: string;
  articleId: string;
  withGitHub = false;
  withResources = false;


  error: string = null;
  isLoading = true;
  hasNextPage = true;
  page = 1;

  isAuthenticated = false;
  private userSub: Subscription;

  availableYears = [
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019
  ];

  startYear = 2012;
  endYear = 2019;

  categoriesForm = new FormControl();
  categories = '';

  searchQuery = '';

  categoriesList = [
    {viewValue: 'Artificial Intelligence', value: 'cs.AI'},
    {viewValue: 'Hardware Architecture', value: 'cs.AR'},
    {viewValue: 'Computational Complexity', value: 'cs.CC'},
    {viewValue: 'Computational Engineering, Finance, and Science', value: 'cs.CE'},
    {viewValue: 'Computational Geometry', value: 'cs.CG'},
    {viewValue: 'Computation and Language', value: 'cs.CL'},
    {viewValue: 'Cryptography and Security', value: 'cs.CR'},
    {viewValue: 'Computer Vision and Pattern Recognition', value: 'cs.CV'},
    {viewValue: 'Computers and Society', value: 'cs.CY'},
    {viewValue: 'Databases', value: 'cs.DB'},
    {viewValue: 'Distributed, Parallel, and Cluster Computing', value: 'cs.DC'},
    {viewValue: 'Digital Libraries', value: 'cs.DL'},
    {viewValue: 'Discrete Mathematics', value: 'cs.DM'},
    {viewValue: 'Data Structures and Algorithms', value: 'cs.DS'},
    {viewValue: 'Emerging Technologies', value: 'cs.ET'},
    {viewValue: 'Formal Languages and Automata Theory', value: 'cs.FL'},
    {viewValue: 'General Literature', value: 'cs.GL'},
    {viewValue: 'Graphics', value: 'cs.GR'},
    {viewValue: 'Computer Science and Game Theory', value: 'cs.GT'},
    {viewValue: 'Human-Computer Interaction', value: 'cs.HC'},
    {viewValue: 'Information Retrieval', value: 'cs.IR'},
    {viewValue: 'Information Theory', value: 'cs.IT'},
    {viewValue: 'Learning', value: 'cs.LG'},
    {viewValue: 'Logic in Computer Science', value: 'cs.LO'},
    {viewValue: 'Multiagent Systems', value: 'cs.MA'},
    {viewValue: 'Multimedia', value: 'cs.MM'},
    {viewValue: 'Mathematical Software', value: 'cs.MS'},
    {viewValue: 'Numerical Analysis', value:  'cs.NA'},
    {viewValue: 'Neural and Evolutionary Computing', value: 'cs.NE'},
    {viewValue: 'Networking and Internet Architecture', value: 'cs.NI'},
    {viewValue: 'Other Computer Science', value: 'cs.OH'},
    {viewValue: 'Operating Systems', value: 'cs.OS'},
    {viewValue: 'Performance', value: 'cs.PF'},
    {viewValue: 'Programming Languages', value: 'cs.PL'},
    {viewValue: 'Robotics', value: 'cs.RO'},
    {viewValue: 'Symbolic Computation', value: 'cs.SC'},
    {viewValue: 'Sound', value: 'cs.SD'},
    {viewValue: 'Software Engineering', value: 'cs.SE'},
    {viewValue: 'Social and Information Networks', value: 'cs.SI'},
    {viewValue: 'Systems and Control', value: 'cs.SY'}
  ];

  // availableSort = [
  //   {value: 'title', viewValue: 'Name'},
  //   {value: 'date', viewValue: 'Date'},
  //   {value: 'popularity', viewValue: 'Popularity'}
  // ];
  //
  // sortBy = 'title';


  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private trackingService: TrackingService
  ) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    this.route.queryParams
      .subscribe(params => {
        if (params.q) {
          this.searchQuery = params.q;
          this.resetArticles(false);
          this.isLoading = true;
          this.loadNextBatch();
        }
      });

    this.route.url.subscribe(
      url =>  {
        console.log(url);
        this.resetArticles(true);
        this.type = url[0].path;

        if (this.type === 'author') {
          this.name = url[1].path;
        }
        if (this.type === 'details') {
          this.articleId = url[1].path;
        }

        this.loadNextBatch();
      }
    );

    this.categoriesForm.valueChanges.subscribe(
      value => {
        console.log(value);
        this.categories = value.toString();
        this.onFilter();
      }

    );
  }

  onFilter() {
    this.resetArticles(false);
    this.isLoading = true;
    this.loadNextBatch();
  }

  resetArticles(full: boolean): void {
    this.articles = [];
    this.page = 1;
    this.hasNextPage = true;
    if (full) {
      this.name = '';
      this.articleId = '';
    }
  }

  loadNextBatch() {
    const params: ArticleQueryParams = {};
    if (this.name) {
      params.name = this.name;
    }

    if (this.articleId) {
      params.id = this.articleId;
    }

    if (this.type === 'search') {
      params.q = this.searchQuery;
    }

    params.startYear = '' + this.startYear;
    params.endYear = '' + this.endYear;

    params.categories = this.categories;

    params.withResources = this.withResources;
    params.withGitHub = this.withGitHub;

    this.articleService.fetchArticles(this.type, this.page, params).subscribe(
      data => {
        console.log(data);
        if (!data || data.error) {
          this.hasNextPage = false;
          return;
        }
        this.articles = this.articles.concat(data.results);
        this.hasNextPage = data.next != null;
        this.page += 1;
        this.isLoading = false;
      },
      error => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }

  onScroll() {
    if (!this.hasNextPage) {
      return;
    }
    this.loadNextBatch();
  }

}
