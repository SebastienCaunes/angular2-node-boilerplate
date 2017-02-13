import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from './user/user.component'
import {ProjectComponent} from './project/project.component';
import {ProjectListComponent} from "./project/project-list/project-list.component";
import {ProjectDetailComponent} from "./project/project-detail/project-detail.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  //{ path: 'project', component: ProjectComponent },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutesModule {}
