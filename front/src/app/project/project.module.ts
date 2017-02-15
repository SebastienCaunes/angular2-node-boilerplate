import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import {ProjectRoutesModule} from "./project.routes";
import {ProjectService} from "./project.service";

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutesModule
  ],
  declarations: [
    ProjectDetailComponent, ProjectListComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule {
}
