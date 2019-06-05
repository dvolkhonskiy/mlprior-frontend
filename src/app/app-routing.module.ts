import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ArticlesComponent} from './articles/articles.component';
import {LoginComponent} from './auth/login.component';
import {DetailsComponent} from './articles/details/details.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LibraryComponent} from './articles/library/library.component';
import {RecommendedComponent} from './articles/recommended/recommended.component';

const routes: Routes = [
  // {path: '', component:LandingComponent},
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'articles',
    children: [
      {
        path: 'recommended',
        component: RecommendedComponent,
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
  // {path: 'articles/:page', component: ArticlesComponent},
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
