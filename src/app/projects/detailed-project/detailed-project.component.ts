import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../_services/project.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-detailed-project',
  templateUrl: './detailed-project.component.html',
  styleUrls: [ './detailed-project.component.scss' ]
})
export class DetailedProjectComponent implements OnInit {
  currentProject: {
    id: number;
    name: string;
    description: string;
    fund: number;
  };
  message: string = "";

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.message = '';
    this.getProject(this.route.snapshot.paramMap.get('id'));
  }

  getProject(id): void {
    this.projectService.get(id).subscribe(
      data => {
        this.currentProject = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateProject(): void {
    this.projectService.update(this.currentProject.id, this.currentProject).subscribe(
      response => {
        console.log(response);
        this.message = 'The project was updated successfully!';
      },
      error => {
        console.log(error);
      });
  }

  deleteProject(): void {
    this.projectService.delete(this.currentProject.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate([ '/projects' ]);
      },
      error => {
        console.log(error);
      });
  }

}
