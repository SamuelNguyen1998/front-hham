import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: [ './dashboard-admin.component.scss' ]
})
export class DashboardAdminComponent implements OnInit {
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
