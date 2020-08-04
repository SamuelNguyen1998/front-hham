import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../_services/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Activity } from "../../_models/Activity";
import { ActivityService } from "../../_services/activity.service";
import { Project } from "../../_models/Project";

@Component({
  selector: 'app-detailed-project',
  templateUrl: './detailed-project.component.html',
  styleUrls: [ './detailed-project.component.scss' ]
})
export class DetailedProjectComponent implements OnInit {
  currentProject: Project;
  message = "";

  constructor(private projectService: ProjectService,
              private activityService: ActivityService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.message = '';
    this.projectService
      .get(this.route.snapshot.params.projectId)
      .subscribe((project) => this.currentProject = project);
    this.projectService.get(this.route.snapshot.paramMap.get('id')).subscribe(
      response => this.currentProject = response.data,
      error => console.log(error)
    );
  }

  updateProject(): void {
    this.projectService.update(this.currentProject.id, this.currentProject).subscribe(
      response => this.message = 'The project was updated successfully!',
      error => console.log(error)
    );
  }

  deleteProject(): void {
    this.projectService.delete(this.currentProject.id).subscribe(
      response => this.router.navigate([ '/projects' ]),
      error => console.log(error));
  }

  getActivities(): Observable<Activity[]> {
    return this.activityService.findAllInProject(this.currentProject.id);
  }
}
