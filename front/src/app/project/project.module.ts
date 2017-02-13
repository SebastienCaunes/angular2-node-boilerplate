import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectListComponent } from "./project-list/project-list.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectDetailComponent, ProjectListComponent
  ]
})
export class ProjectModule {
}
