import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ArticlesComponent} from './articles/articles.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {DetailsComponent} from './articles/details/details.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'articles/:page', component: ArticlesComponent},
  {path: 'articles/details/:id', component: DetailsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
