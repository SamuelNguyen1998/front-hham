import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../_models/Project';
import { Activity } from "../_models/Activity";
import { ProjectService } from '../_services/project.service';
import { ActivityService } from '../_services/activity.service';

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
  touched = false;
  projects: Project[];

  constructor(private activityService: ActivityService,
              private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) {
    this.activity.projectId = this.route.snapshot.params.projectId;
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  create(): void {
    this.activityService.create(this.activity).subscribe(
      response => {
        // TODO: Flash success message
        this.router.navigate([ `/activities/${ response.data.id }` ]);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  nameIsValid(): boolean {
    return this.activity.name.length > 0;
  }

  reset(): void {
    this.touched = false;
    this.activity = { name: '', description: '' };
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe(
      response => this.projects = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }
}
