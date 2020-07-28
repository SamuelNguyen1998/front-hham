import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  currentProject = null;
  message = '';

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getProject(this.route.snapshot.paramMap.get('id'));
  }

  getProject(id): void {
    this.projectService.get(id)
      .subscribe(
        data => {
          this.currentProject = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentProject.title,
      description: this.currentProject.description,
      published: status
    };

    this.projectService.update(this.currentProject.id, data)
      .subscribe(
        response => {
          this.currentProject.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateProject(): void {
    this.projectService.update(this.currentProject.id, this.currentProject)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The project was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProject(): void {
    this.projectService.delete(this.currentProject.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/projects']);
        },
        error => {
          console.log(error);
        });
  }

}
