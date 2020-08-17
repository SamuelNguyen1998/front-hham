import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './_services/auth.interceptor';

import { NotFoundComponent } from './not-found/not-found.component';
import { AppHeaderComponent } from './app-header/app-header.component';
//import { AppFooterComponent } from './app-footer/app-footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { ActivitiesComponent } from './activities/activities.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

import { JobTitlesComponent } from './job-titles/job-titles.component';
import { AddJobTitleComponent } from './add-job-title/add-job-title.component';

import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { FundComponent } from './fund/fund.component';
import { FundDetailsComponent } from './fund-details/fund-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
//    AppFooterComponent,
    NotFoundComponent,
    LoginComponent,
    DashboardComponent,

    ActivitiesComponent,
    AddActivityComponent,
    ActivityDetailsComponent,

    JobTitlesComponent,
    AddJobTitleComponent,

    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,

    UsersComponent,
    AddUserComponent,
    UserProfileComponent,

    FundComponent,
    FundDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
