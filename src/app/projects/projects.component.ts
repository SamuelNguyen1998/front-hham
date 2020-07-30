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
  currentProject: Project;

  constructor(public auth: AuthService,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.projectService.getAll().subscribe(
      data => {
        this.projects = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchByName() {
    this.projectService.findByTitle(this.name).subscribe(
      data => {
        this.projects = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveProjects();
    this.currentProject = null;
    // this.currentIndex = -1;
  }

  // setActiveProject(project, index): void {
  //   this.currentProject = project;
  //   this.currentIndex = index;
  // }
}
