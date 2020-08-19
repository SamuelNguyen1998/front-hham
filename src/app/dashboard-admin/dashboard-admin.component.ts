import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FundService } from '../_services/fund.service';
import { Transaction } from '../_models/Transaction';
import { Activity } from '../_models/Activity';
import { ActivityService } from '../_services/activity.service';
import { User } from '../_models/User';
import { Project } from '../_models/Project';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  errorMessage = '';
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: any;
  lineChartColors: Color[];
  lineChartLegend: boolean;
  lineChartPlugins: any;
  lineChartType: string;
  sum: number = 0;

  transactions: Transaction[];
  activities: Activity[];
  users: User[];
  projects: Project[];

  constructor(private userService: UserService,
              private activityService: ActivityService,
              private fundService: FundService,
              private projectService: ProjectService,
              ) { }

  ngOnInit(): void {
    this.loadChart();
    this.getAllFund();
    this.getAllTransaction();
    this.getAllActivity();
    this.getAllUser();
  }
  loadChart(): void {
    this.lineChartData = [
      {
        borderColor: "#6bd098",
        backgroundColor: "#6bd098",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: [85, 72, 78, 75, 77, 75, 75, 77, 78, 60],
        label: 'Hello'
      },
      {
        borderColor: "#f17e5d",
        backgroundColor: "#f17e5d",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: [60, 75, 70, 62, 60, 70, 65, 60, 80, 72], 
        label: 'Hello 2'
      },
    ];

    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', "Jul", "Aug", "Sep", "Oct"];

    this.lineChartOptions = {
      responsive: true,
    };

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.28)',
      },
    ];

    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';
  }
  getAllTransaction(): void {
    this.fundService.getAll().subscribe(
      response => this.transactions = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }
  getAllUser(): void {
    this.userService.getAll().subscribe(
      response => this.users = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }
  getAllActivity(): void {
    this.activityService.getAll().subscribe(
      response => this.activities = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  getAllFund(): void {
    this.projectService.getAll().subscribe(
      response =>  {
            this.projects = response.data;
            this.projects.forEach(a => this.sum += a.funds[0].amount);
          },
    )
    
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}
