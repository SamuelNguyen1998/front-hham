import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../_models/Project';
import { Activity } from "../_models/Activity";
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';
import { DataValidatorService } from "../_services/data-validator.service";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: [ './add-activity.component.scss' ]
})
export class AddActivityComponent implements OnInit {
  activity: Activity = {
    name: '',
    description: '',
    projectId: null,
  };
  errorMessage = '';
  touched = { name: false, project: false };
  projects: Project[];

  constructor(private activityService: ActivityService,
              private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,
              private validate: DataValidatorService) {
    this.activity.projectId = this.route.snapshot.params.projectId;
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  isNameValid(): boolean {
    return this.validate.nonEmpty(this.activity.name);
  }

  isProjectIdValid(): boolean {
    return !!this.activity.projectId;
  }

  create(event: Event): void {
    if (!this.isNameValid() || !this.isProjectIdValid()) {
      this.touched = { name: true, project: true };
      event.preventDefault();
      return;
    }
    this.activityService.create(this.activity).subscribe(
      response => {
        this.router.navigate([ `/activities/${ response.data.id }` ]);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  reset(): void {
    this.touched = { project: false, name: false };
    this.activity = { name: '', description: '' };
  }

  loadProjects(): void {
    this.projectService.getAllAdministering().subscribe(
      response => this.projects = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }
}
