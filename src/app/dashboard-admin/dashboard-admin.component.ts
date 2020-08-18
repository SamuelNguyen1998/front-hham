import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: [ './dashboard-admin.component.scss' ]
})
export class DashboardAdminComponent implements OnInit {
  content: string;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: any;
  lineChartColors: Color[];
  lineChartLegend: boolean;
  lineChartPlugins: any;
  lineChartType: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadChart();
  }
  loadChart(): void{
    this.lineChartData = [
      { data: [85, 72, 78, 75, 77, 75], label: 'Hello' },
      { data: [32, 90, 70, 50, 60, 70], label: 'Hello 2' },
    ];
  
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
  
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
}
