import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

import { ProjectsComponent } from "./projects/projects.component";
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { DetailedProjectComponent } from "./projects/detailed-project/detailed-project.component";

import { ActivitiesComponent } from "./activities/activities.component";
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { DetailedActivityComponent } from "./activities/detailed-activity/detailed-activity.component";

import { UsersComponent } from "./users/users.component";
import { AddUserComponent } from './users/add-user/add-user.component';
import { DetailedUserComponent } from "./users/detailed-user/detailed-user.component";
import { AuthGuard } from "./_services/auth-guard.service";

import { JobsComponent } from "./jobs/jobs.component";
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { FundComponent } from './fund/fund.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },

  { path: 'projects', component: ProjectsComponent, canActivate: [ AuthGuard ] },
  { path: 'projects/add', component: AddProjectComponent, canActivate: [ AuthGuard ] },
  { path: 'projects/:id', component: DetailedProjectComponent, canActivate: [ AuthGuard ] },

  { path: 'activities', component: ActivitiesComponent, canActivate: [ AuthGuard ] },
  { path: 'activities/add/:id', component: AddActivityComponent, canActivate: [ AuthGuard ] },
  { path: 'activities/add/null', component: AddActivityComponent, canActivate: [ AuthGuard ] },
  { path: 'activities/:id', component: DetailedActivityComponent, canActivate: [ AuthGuard ] },

  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard ] },
  { path: 'users/add', component: AddUserComponent, canActivate: [ AuthGuard ] },
  { path: 'users/:id', component: DetailedUserComponent, canActivate: [ AuthGuard ] },

  { path: 'jobs', component: JobsComponent, canActivate: [ AuthGuard ] },
  { path: 'jobs/add', component: AddJobComponent, canActivate: [ AuthGuard ] },
  { path: 'jobs/:id', component: JobDetailComponent , canActivate: [ AuthGuard ] },

  { path: 'funds', component: FundComponent, canActivate: [ AuthGuard ] },
  
  { path: '*', redirectTo: 'login' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
