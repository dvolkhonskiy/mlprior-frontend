import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { SignupComponent } from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {ArticleService} from './articles/articles.service';
import { NavigationComponent } from './articles/navigation/navigation.component';
import {APIService} from './api.service';
import { DetailsComponent } from './articles/details/details.component';
import { BlogpostsComponent } from './articles/details/blogposts/blogposts.component';
import { GithubsComponent } from './articles/details/githubs/githubs.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
    GithubsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, ArticleService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
