import { Component, OnInit } from '@angular/core';

import { ActivityService } from '../_services/activity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/Project';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: [ './add-activity.component.scss' ]
})
export class AddActivityComponent implements OnInit {
  activity = {
    name: '',
    description: '',
    projectId: this.route.snapshot.params.id,
  };
  errorMessage = '';
  userTouched = false;
  projects: Project[];

  constructor(private activityService: ActivityService,
              private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  create(): void {
    this.activityService.create(this.activity).subscribe(
      response => {
        // TODO: Flash success message
        this.router.navigate([ `/activities/${response.id}` ]);
      },
      error => {
        this.errorMessage = 'Failed creating activity';
        console.log(error);
      }
    );
  }

  nameIsValid(): boolean {
    return this.activity.name.length > 0;
  }

  reset() {
    this.userTouched = false;
    this.activity.name = '';
    this.activity.description = '';
  }
  loadProjects(): void {
    this.projectService.getAll().subscribe(
      response => this.projects = response.data,
      console.log
    );
  }
}
