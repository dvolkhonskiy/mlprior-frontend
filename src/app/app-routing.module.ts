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

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'articles',
    children: [
      {
        path: 'recommended',
        component: RecommendedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'recent',
        component: RecommendedComponent,
      },
      {
        path: 'popular',
        component: RecommendedComponent,
      }
    ]
  },
  {
    path: 'library',
    children: [
      {
        path: 'saved',
        component: LibraryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'liked',
        component: LibraryComponent,
        canActivate: [AuthGuard]
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
  {path: 'feedback', component: FeedbackComponent},
  {path: 'articles/details/:id', component: DetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
