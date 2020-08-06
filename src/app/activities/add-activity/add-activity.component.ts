import { Component, OnInit, Input } from '@angular/core';

import { ActivityService } from "../../_services/activity.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: [ './add-activity.component.scss' ]
})
export class AddActivityComponent implements OnInit {
  activity: { name: string; description: string ; projectId: any};
  submitted: boolean = false;
  idProject: any;

  constructor(
    private activityService: ActivityService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newActivity();
    this.idProject = this.route.snapshot.paramMap.get('id');
  }

  saveActivity(): void {
    const { name, description } = this.activity;
    const data = {
      name,
      description,
      projectId: this.idProject
    };

    this.activityService.create(data).subscribe(
      response => this.submitted = true,
      error => console.log(error)
    );
    this.router.navigate(["activities"]);
  }

  newActivity(): void {
    this.submitted = false;
    this.activity = {
      name: '',
      description: '',
      projectId: this.idProject
    };
  }
}
