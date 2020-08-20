import { Component, OnInit } from '@angular/core';
import { Project } from "../_models/Project";
import { AuthService } from '../_services/auth.service';
import { FundService } from '../_services/fund.service';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: [ './fund.component.scss' ]
})
export class FundComponent implements OnInit {
  projects: Project[];
  funds: any;

  constructor(private projectService: ProjectService,
              public auth: AuthService,
              private fundService: FundService) {
  }

  ngOnInit(): void {
    this.retrieveProjects();

  }

  retrieveProjects(): void {
    this.projectService.getAll().subscribe(
      response => this.projects = response.data,
    );
  }

  retrieveFunds(): void {
    this.fundService.getAllFund().subscribe(
      response => this.projects = response.data,
    );
  }
}
