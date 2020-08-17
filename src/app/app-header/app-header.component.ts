import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: [ './app-header.component.scss' ]
})
export class AppHeaderComponent implements OnInit {
  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }
}
