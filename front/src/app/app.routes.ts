import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from './user/user.component'
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

import {authRoutes} from "./auth/auth.routes"
import {AuthGuard} from "./shared/auth-guard.service";

const routes:Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  //{ path: 'project', component: ProjectComponent },
  ...authRoutes,
  {path: '**', component: PageNotFoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule {
}
