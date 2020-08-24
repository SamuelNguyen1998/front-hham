import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";
import { ProjectService } from "../_services/project.service";
import { DataValidatorService } from "../_services/data-validator.service";
import { Project } from "../_models/Project";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: [ './add-user.component.scss' ]
})
export class AddUserComponent implements OnInit {
  email = '';
  projectId: number = null;
  touched = false;
  errorMessage = '';
  submitted = false;
  projects: Project[];

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private validate: DataValidatorService) {
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllAdministering().subscribe(
      response => this.projects = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  isValidEmail(): boolean {
    return this.validate.email(this.email);
  }

  submit(): void {
    if (!this.isValidEmail()) {
      this.touched = true;
      return;
    }
    this.userService.invite(this.email, this.projectId).subscribe(
      response => this.submitted = true,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }
}
