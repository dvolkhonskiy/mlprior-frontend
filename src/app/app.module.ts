import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './auth/login.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ArticleService} from './articles/articles.service';
import {RecommendedNavigationComponent} from './articles/recommended/recommended-navigation/recommended-navigation.component';
import {APIService} from './shared/api.service';
import {DetailsComponent} from './articles/details/details.component';
import {BlogpostsComponent} from './articles/details/blogposts/blogposts.component';
import {ResourcesComponent} from './articles/details/article-resources/resources.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import { TrendsComponent } from './dashboard/trends/trends.component';
import {DxChartModule, DxSelectBoxModule, DxRangeSelectorModule, DxTextAreaModule} from 'devextreme-angular';
import {DashboardDataService} from './dashboard/dashboard-data.service';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import { LibraryComponent } from './articles/library/library.component';
import { LibraryNavigationComponent } from './articles/library/library-navigation/library-navigation.component';
import { RecommendedComponent } from './articles/recommended/recommended.component';
import { LandingComponent } from './landing/landing.component';
import {MaterialAngularModule} from './material-angular/material-angular.module';
import {FeedbackComponent} from './feedback/feedback.component';
import {ArticleCardComponent} from './articles/reusable/article-card/article-card.component';
import { GithubCardComponent } from './articles/details/article-resources/github-card/github-card.component';
import { ResourceCardComponent } from './articles/details/article-resources/resource-card/resource-card.component';
import { SummaryComponent } from './articles/details/summary/summary.component';
import {ArticleLikeComponent} from './articles/reusable/article-like/article-like.component';
import { AuthorComponent } from './articles/author/author.component';
import { AuthorsListComponent } from './articles/reusable/authors-list/authors-list.component';
import { PremiumComponent } from './premium/premium.component';
import {TrackingService} from './shared/tracking.service';
import { ArticlesListComponent } from './articles/reusable/articles-list/articles-list.component';
import { SearchComponent } from './articles/search/search.component';
import { FiltersComponent } from './articles/reusable/articles-list/filters/filters.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ProfileComponent } from './auth/profile/profile.component';
import {TruncateModule} from '@yellowspot/ng-truncate';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RecommendedNavigationComponent,
    DetailsComponent,
    BlogpostsComponent,
    ResourcesComponent,
    PageNotFoundComponent,
    TrendsComponent,
    CategoriesComponent,
    ProfileMenuComponent,
    // LandingComponent
    LoadingSpinnerComponent,
    LibraryComponent,
    LibraryNavigationComponent,
    RecommendedComponent,
    LandingComponent,
    FeedbackComponent,
    ArticleCardComponent,
    GithubCardComponent,
    ResourceCardComponent,
    SummaryComponent,
    ArticleLikeComponent,
    AuthorComponent,
    AuthorsListComponent,
    PremiumComponent,
    ArticlesListComponent,
    SearchComponent,
    FiltersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgbModule,
    ReactiveFormsModule,
    DxChartModule,
    DxSelectBoxModule,
    DxRangeSelectorModule,
    DxTextAreaModule,
    MaterialAngularModule,
    NgxPayPalModule,
    TruncateModule
  ],
  providers: [
    ArticleService,
    APIService,
    DashboardDataService,
    AuthService,
    TrackingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
