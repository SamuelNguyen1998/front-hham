import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityService } from "../../_services/activity.service";

@Component({
  selector: 'app-detailed-activity',
  templateUrl: './detailed-activity.component.html',
  styleUrls: [ './detailed-activity.component.scss' ]
})
export class DetailedActivityComponent implements OnInit {
  currentActivity = null;
  message = '';
  activityForm: FormGroup = this.formBuilder.group({
    name: '',
    description: '',
    URL: '',
    options: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder,
              private activityService: ActivityService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getActivity(this.route.snapshot.paramMap.get('id'));
  }

  getActivity(id): void {
    this.activityService.get(id).subscribe(
      data => {
        this.currentActivity = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  onSubmit() {
    console.log(this.activityForm.value);
  }

  addOption() {
    this.options().push(this.newOption());
  }

  options(): FormArray {
    return this.activityForm.get("options") as FormArray
  }

  newOption(): FormGroup {
    return this.formBuilder.group({
      nameOption: '',
      image: '',
      price: ''
    })
  }

  removeOption(index: number) {
    this.options().removeAt(index);
  }

  updateActivity(): void {
    this.activityService.update(this.currentActivity.id, this.currentActivity).subscribe(
      response => {
        console.log(response);
        this.message = 'The activity was updated successfully!';
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteActivity(): void {
    this.activityService.delete(this.currentActivity.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate([ '/activity' ]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
