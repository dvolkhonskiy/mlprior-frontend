import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './auth/login.component';
import {DetailsComponent} from './articles/details/details.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LibraryComponent} from './articles/library/library.component';
import {RecommendedComponent} from './articles/recommended/recommended.component';
import {LandingComponent} from './landing/landing.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ArticleAuthor} from './articles/article.model';
import {AuthorComponent} from './articles/author/author.component';
import {PricingComponent} from './pricing/pricing.component';
import {SearchComponent} from './articles/search/search.component';

const routes: Routes = [
  {path: '', component: LandingComponent,  data: { title: 'Simplify your research' }},
  {path: 'pricing', component: PricingComponent, data: {title: 'Pricing'}},
  {path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }},
  {
    path: 'articles',
    children: [
      {
        path: 'recommended',
        component: RecommendedComponent,
        canActivate: [AuthGuard],
        data: { title: 'Recommended' }
      },
      {
        path: 'recent',
        component: RecommendedComponent,
        data: { title: 'Recent' }
      },
      {
        path: 'popular',
        component: RecommendedComponent,
        data: { title: 'Popular' }
      },
      {path: 'author/:name', component: AuthorComponent},
      {path: 'details/:id', component: DetailsComponent},
      {path: 'search', component: SearchComponent, data: { title: 'Search' }}
    ]
  },
  {
    path: 'library',
    children: [
      {
        path: 'saved',
        component: LibraryComponent,
        canActivate: [AuthGuard],
        data: { title: 'Saved' }
      },
      {
        path: 'liked',
        component: LibraryComponent,
        canActivate: [AuthGuard],
        data: { title: 'Liked' }
      },
      {
        path: 'disliked',
        component: LibraryComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  // {path: 'articles/library', component: ArticlesComponent, canActivate: [AuthGuard]},
  // {path: 'articles/liked', component: ArticlesComponent, canActivate: [AuthGuard]},
  // {path: 'articles/disliked', component: ArticlesComponent, canActivate: [AuthGuard]},
  {path: 'feedback', component: FeedbackComponent, data: { title: 'Feedback' }},
  {path: 'login', component: LoginComponent, data: { title: 'Login' }},
  {path: '**', component: PageNotFoundComponent, data: { title: 'Page Not Found' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
