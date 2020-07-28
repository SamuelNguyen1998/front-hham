import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  project = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  saveProject(): void {
    const data = {
      title: this.project.title,
      description: this.project.description
    };

    this.projectService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newProject(): void {
    this.submitted = false;
    this.project = {
      title: '',
      description: '',
      published: false
    };
  }

}
