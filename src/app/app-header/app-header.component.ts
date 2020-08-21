import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Project } from "../_models/Project";
import { ProjectService } from "../_services/project.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: [ './app-header.component.scss' ]
})
export class AppHeaderComponent implements OnInit {
  projectsAdministering: Project[] = [];

  constructor(public auth: AuthService,
              private router: Router,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.auth.loginStateChange$.subscribe(loggedIn => {
      if (loggedIn) {
        this.projectService.getAllAdministering().subscribe(
          response => this.projectsAdministering = response.data
        );
      }
    })
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate([ '/login' ]);
    this.projectsAdministering = [];
  }
}
