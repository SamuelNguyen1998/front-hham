import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { Project } from "../_models/Project";
import { ProjectService } from "../_services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [ './projects.component.scss' ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  name: string;

  constructor(public auth: AuthService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.projectService.getAll().subscribe(
      data => this.projects = data.projects,
      error => console.log(error)
    );
  }

  searchByName(): void {
    this.projectService.findByName(this.name).subscribe(
      data => this.projects = data,
      error => console.log(error)
    );
  }
}
