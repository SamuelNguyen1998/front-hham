import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
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
  sum = 0;

  barChartOptions: ChartOptions;
  barChartLabels: Label[] = [];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartPlugins: any;
  barChartData: ChartDataSets[] = [{
    data: [], 
    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'], 
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'], 
      label: "Fund"
  }];


  transactions: Transaction[];
  activities: Activity[];
  users: User[];
  projects: Project[];

  constructor(private userService: UserService,
    private activityService: ActivityService,
    private fundService: FundService,
    private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.getAllFund();
    this.getAllTransaction();
    this.getAllActivity();
    this.getAllUser();
    // this.loadLineChart();
    this.loadBarChart();
  }

  loadBarChart(): void {
    this.barChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          gridLines: {
            offsetGridLines: true
          }
        }]
      }
    };
    this.projectService.getAll().subscribe(
      response => {
        this.projects = response.data;
        this.projects.forEach(p => this.barChartLabels.push(p.name))
        this.projects.forEach(p => this.barChartData[0].data.push(p.funds[0].amount))
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];

  }

  // loadLineChart(): void {
  //   this.lineChartData = [
  //     {
  //       borderColor: "#6bd098",
  //       backgroundColor: 'transparent',
  //       pointRadius: 4,
  //       pointHoverRadius: 4,
  //       pointBorderWidth: 8,
  //       pointBorderColor: '#6bd098',
  //       borderWidth: 3,
  //       fill: false,
  //       data: [85, 72, 78, 75, 77, 75, 75, 77, 78, 60],
  //       label: 'Funding'
  //     },
  //     {
  //       borderColor: "#f17e5d",
  //       pointRadius: 4,
  //       pointHoverRadius: 4,
  //       pointBorderWidth: 8,
  //       pointBorderColor: '#f17e5d',
  //       borderWidth: 3,
  //       backgroundColor: 'transparent',
  //       fill: false,
  //       data: [60, 75, 70, 62, 60, 70, 65, 60, 80, 72],
  //       label: 'Spending'
  //     },
  //   ];

  //   this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', "Jul", "Aug", "Sep", "Oct"];

  //   this.lineChartOptions = {
  //     responsive: true,
  //   };

  //   this.lineChartColors = [
  //     {
  //       borderColor: '#6bd098',
  //       backgroundColor: 'rgba(255,255,0,0.28)',
  //     },
  //     {
  //       borderColor: '#f17e5d',
  //       backgroundColor: 'rgba(255,255,0,0.28)',
  //     },
  //   ];

  //   this.lineChartLegend = true;
  //   this.lineChartPlugins = [];
  //   this.lineChartType = 'line';
  // }

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
      response => {
        this.projects = response.data;
        this.projects.forEach(a => this.sum += a.funds[0].amount);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}
