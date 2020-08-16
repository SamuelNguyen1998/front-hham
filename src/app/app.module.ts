import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ValidateEqualModule } from 'ng-validate-equal';

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
import { JobTitleDetailsComponent } from './job-title-details/job-title-details.component';

import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { FundComponent } from './fund/fund.component';

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
    JobTitleDetailsComponent,

    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,

    UsersComponent,
    AddUserComponent,
    UserDetailsComponent,
    UserProfileComponent,

    FundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ValidateEqualModule,
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
