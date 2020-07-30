import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/_services/activity.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  activity = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
  }

  saveActivity(): void {
    const data = {
      title: this.activity.title,
      description: this.activity.description
    };

    this.activityService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newActivity(): void {
    this.submitted = false;
    this.activity = {
      title: '',
      description: '',
      published: false
    };
  }
}
