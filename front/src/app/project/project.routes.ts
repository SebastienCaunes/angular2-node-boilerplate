import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './project.component';
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectListComponent} from "./project-list/project-list.component";

const routes: Routes = [
  {
    path : 'detail',
    component : ProjectDetailComponent,
  },
  {
    path : 'list',
    component : ProjectListComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OrderRoutesModule {}
