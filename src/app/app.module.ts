import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import { ValidateEqualModule } from 'ng-validate-equal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './_services/auth.interceptor';

import { NotFoundComponent } from './not-found/not-found.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';

import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { ActivitiesComponent } from './activities/activities.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

import { JobTitlesComponent } from './job-titles/job-titles.component';
import { AddJobTitleComponent } from './add-job-title/add-job-title.component';

import { UsersComponent } from './users/users.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { FundComponent } from './fund/fund.component';
import { FundDetailsComponent } from './fund-details/fund-details.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    NotFoundComponent,
    LoginComponent,
    DashboardComponent,
    DashboardAdminComponent,
    DashboardUserComponent,

    ActivitiesComponent,
    AddActivityComponent,
    ActivityDetailsComponent,

    JobTitlesComponent,
    AddJobTitleComponent,

    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,

    UsersComponent,
    CreateAccountComponent,
    UserProfileComponent,

    FundComponent,
    FundDetailsComponent,
    AddUserComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    ValidateEqualModule,
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
