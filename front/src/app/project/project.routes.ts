import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDetailComponent} from "./project-detail/project-detail.component";
import {ProjectListComponent} from "./project-list/project-list.component";

const routes: Routes = [
  {
    path : 'projects/detail/:id',
    component : ProjectDetailComponent,
  },
  {
    path : 'projects/list',
    component : ProjectListComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectRoutesModule {}
