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
import {APIService} from './api.service';
import {DetailsComponent} from './articles/details/details.component';
import {BlogpostsComponent} from './articles/details/blogposts/blogposts.component';
import {GithubsComponent} from './articles/details/githubs/githubs.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule ,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

// import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RecommendedNavigationComponent,
    DetailsComponent,
    BlogpostsComponent,
    GithubsComponent,
    PageNotFoundComponent,
    TrendsComponent,
    CategoriesComponent,
    ProfileMenuComponent,
    // LandingComponent
    LoadingSpinnerComponent,
    LibraryComponent,
    LibraryNavigationComponent,
    RecommendedComponent,
    LandingComponent
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
    DxTextAreaModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    ArticleService,
    APIService,
    DashboardDataService,
    AuthService,
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
