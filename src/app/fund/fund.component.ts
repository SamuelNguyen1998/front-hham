import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { FundService } from '../_services/fund.service';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  projects: any;
  members: any;
  currentProject = null;
  currentIndex = -1;
  title = '';

  constructor(private projectService: ProjectService, private fundService: FundService) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.projectService.getAll()
      .subscribe(
        response => {
          this.projects = response.data;
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveProjects();
    this.currentProject = null;
    this.currentIndex = -1;
  }

  setActiveProject(project, index): void {
    this.currentProject = project;
    this.currentIndex = index;
    this.projectService.getMember(this.currentProject.id)
      .subscribe(
        response => {
          console.log(response.data);
          this.members = response.data;
        },
        error => console.log(error),       
      );
  }
}