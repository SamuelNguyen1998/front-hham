import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { ActivitiesComponent } from './activities/activities.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddJobTitleComponent } from './add-job-title/add-job-title.component';
import { JobTitleDetailsComponent } from './job-title-details/job-title-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },

  { path: 'projects', component: ProjectsComponent, canActivate: [ AuthGuard ] },
  { path: 'projects/add', component: AddProjectComponent, canActivate: [ AuthGuard ] },
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [ AuthGuard ] },

  { path: 'activities', component: ActivitiesComponent, canActivate: [ AuthGuard ] },

  { path: 'activities/add', component: AddActivityComponent, canActivate: [ AuthGuard ] },
  { path: 'activities/:id', component: ActivityDetailsComponent, canActivate: [ AuthGuard ] },

  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard ] },
  { path: 'users/add', component: AddUserComponent, canActivate: [ AuthGuard ] },
  { path: 'users/:id/edit', component: UserDetailsComponent, canActivate: [ AuthGuard ] },

  { path: 'jobs', component: JobTitlesComponent, canActivate: [ AuthGuard ] },
  { path: 'jobs/add', component: AddJobTitleComponent, canActivate: [ AuthGuard ] },
  { path: 'jobs/:id', component: JobTitleDetailsComponent, canActivate: [ AuthGuard ] },

  // { path: 'funds', component: FundComponent, canActivate: [ AuthGuard ] },

  { path: '404', component: NotFoundComponent },
  { path: ':username', component: UserProfileComponent, canActivate: [ AuthGuard ] },
  { path: '*', redirectTo: '404' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
