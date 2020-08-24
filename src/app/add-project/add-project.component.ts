import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from "../_models/Project";
import { ProjectService } from '../_services/project.service';
import { DataValidatorService } from "../_services/data-validator.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: [ './add-project.component.scss' ]
})
export class AddProjectComponent implements OnInit {
  project: Project = {
    name: '',
    description: '',
  };
  touched = false;
  errorMessage = '';

  constructor(private projectService: ProjectService,
              private router: Router,
              private validate: DataValidatorService) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.touched = true;
    if (!this.isValidName()) {
      return;
    }
    this.projectService.create(this.project).subscribe(
      response => {
        // TODO: Add flash message to show on details page
        this.router.navigate([ `/projects/${ response.data.id }` ]);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  isValidName(): boolean {
    return this.validate.nonEmpty(this.project.name);
  }

  reset(): void {
    this.touched = false;
    this.project = {
      name: '',
      description: ''
    };
  }
}
