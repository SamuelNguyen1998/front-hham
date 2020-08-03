import { Component, OnInit } from '@angular/core';

import { ProjectService } from "../../_services/project.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: [ './add-project.component.scss' ]
})
export class AddProjectComponent implements OnInit {
  project: {
    fund: number;
    name: string;
    description: string;
  };
  submitted = false;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  saveProject(): void {
    const { name, description } = this.project;
    this.projectService.create({ name, description }).subscribe(
      response => this.submitted = true,
      error => console.log(error));
  }

  newProject(): void {
    this.submitted = false;
    this.project = {
      name: '',
      description: '',
      fund: 0,
    };
  }

}
