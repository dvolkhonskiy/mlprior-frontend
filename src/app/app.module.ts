import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ArticlesComponent} from './articles/articles.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {SignupComponent} from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SigninComponent} from './auth/signin/signin.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ArticleService} from './articles/articles.service';
import {NavigationComponent} from './articles/navigation/navigation.component';
import {APIService} from './api.service';
import {DetailsComponent} from './articles/details/details.component';
import {BlogpostsComponent} from './articles/details/blogposts/blogposts.component';
import {GithubsComponent} from './articles/details/githubs/githubs.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from './auth-guard.service';
import { TrendsComponent } from './dashboard/trends/trends.component';
import {DxChartModule, DxSelectBoxModule, DxRangeSelectorModule, DxTextAreaModule} from 'devextreme-angular';
import {DashboardDataService} from './dashboard/dashboard-data.service';
import { CategoriesComponent } from './dashboard/categories/categories.component';

// import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ArticlesComponent,
    SignupComponent,
    SigninComponent,
    NavigationComponent,
    DetailsComponent,
    BlogpostsComponent,
    GithubsComponent,
    PageNotFoundComponent,
    TrendsComponent,
    CategoriesComponent,
    // LandingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgbModule,
    ReactiveFormsModule,
    DxChartModule,
    DxSelectBoxModule,
    DxRangeSelectorModule,
    DxTextAreaModule
  ],
  providers: [AuthService, ArticleService, APIService, AuthGuardService, DashboardDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
