import { Component, OnInit } from '@angular/core';
import { Project } from "../_models/Project";
import { AuthService } from "../_services/auth.service";
import { ProjectService } from "../_services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [ './projects.component.scss' ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  visibleProjects: Project[];
  searchTerm = '';
  errorMessage: string;

  constructor(public auth: AuthService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.projectService.getAll().subscribe(
      response => {
        this.projects = response.data;
        this.visibleProjects = this.projects;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  searchByName(): void {
    if (this.searchTerm === '') {
      this.visibleProjects = this.projects;
    }
    this.visibleProjects = this.projects.filter(
      project => project.name.indexOf(this.searchTerm) >= 0
    );
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}
