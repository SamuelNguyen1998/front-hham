import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: [ './menubar.component.scss' ]
})
export class MenubarComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

}
