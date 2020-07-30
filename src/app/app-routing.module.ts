import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardSysadminComponent } from './board-sysadmin/board-sysadmin.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ActivityDetailsComponent } from './activities/activity-details/activity-details.component';
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'sysadmin', component: BoardSysadminComponent },

  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'project/add', component: AddProjectComponent },

  { path: 'activities/:id', component: ActivityDetailsComponent },
  { path: 'activity/add', component: AddActivityComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'user/add', component: AddUserComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
