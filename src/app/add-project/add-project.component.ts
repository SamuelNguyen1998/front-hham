import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../_services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: [ './add-project.component.scss' ]
})
export class AddProjectComponent implements OnInit {
  project = {
    name: '',
    description: '',
  };
  userTouched = false;
  errorMessage = '';

  constructor(private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.projectService.create(this.project).subscribe(
      response => {
        // TODO: Add flash message to show on details page
        this.router.navigate([ `/projects/${response.id}` ]);
      },
      error => {
        this.errorMessage = 'What to write? Failed creating project?';
        console.log(error);
      }
    );
  }

  isValidName(): boolean {
    return this.project.name.length > 0;
  }

  reset(): void {
    this.userTouched = false;
    this.project = {
      name: '',
      description: ''
    };
  }
}
