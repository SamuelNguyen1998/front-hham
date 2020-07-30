import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../_services/activity.service";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: [ './add-activity.component.scss' ]
})
export class AddActivityComponent implements OnInit {
  activity: { name: string; description: string };
  submitted: boolean = false;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
  }

  saveActivity(): void {
    const data = {
      title: this.activity.name,
      description: this.activity.description
    };

    this.activityService.create(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  newActivity(): void {
    this.submitted = false;
    this.activity = {
      name: '',
      description: '',
    };
  }
}

/*
*/
