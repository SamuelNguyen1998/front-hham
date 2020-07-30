import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MenubarComponent } from './menubar/menubar.component';

import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { DetailedProjectComponent } from './projects/detailed-project/detailed-project.component';

import { ActivitiesComponent } from './activities/activities.component';
import { AddActivityComponent } from './activities/add-activity/add-activity.component';
import { DetailedActivityComponent } from './activities/detailed-activity/detailed-activity.component';

import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { DetailedUserComponent } from './users/detailed-user/detailed-user.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,

    MenubarComponent,

    ProjectsComponent,
    AddProjectComponent,
    DetailedProjectComponent,

    ActivitiesComponent,
    AddActivityComponent,
    DetailedActivityComponent,

    UsersComponent,
    AddUserComponent,
    DetailedUserComponent,

    DashboardComponent,
    DashboardAdminComponent,
    DashboardUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ /*authInterceptorProviders*/ ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
