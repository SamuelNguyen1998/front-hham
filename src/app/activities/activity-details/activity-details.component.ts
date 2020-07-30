import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/_services/activity.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

  currentActivity = null;
  message = '';
  // public options: any[] = [{
  //   id: 1,
  //   name: '',
  //   image: '',
  //   price: ''
  // }];
  
  activityForm: FormGroup;

  constructor(
    private formBuilder :FormBuilder,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router) {
      this.activityForm = this.formBuilder.group({
        name: '',
        description: '',
        URL: '',
        options: this.formBuilder.array([]) ,
      });
     }

  ngOnInit(): void {
    this.message = '';
    this.getActivity(this.route.snapshot.paramMap.get('id'));
  }

  options() : FormArray {
    return this.activityForm.get("options") as FormArray
  }

  newOption(): FormGroup {
    return this.formBuilder.group({
      nameOption: '',
      image: '',
      price: ''
    })
  }

  addOption() {
    this.options().push(this.newOption());
  }
   
  removeOption(i:number) {
    this.options().removeAt(i);
  }
   
  onSubmit() {
    console.log(this.activityForm.value);
  }

  getActivity(id): void {
    this.activityService.get(id)
      .subscribe(
        data => {
          this.currentActivity = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentActivity.title,
      description: this.currentActivity.description,
      published: status
    };

    this.activityService.update(this.currentActivity.id, data)
      .subscribe(
        response => {
          this.currentActivity.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateActivity(): void {
    this.activityService.update(this.currentActivity.id, this.currentActivity)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The activity was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteActivity(): void {
    this.activityService.delete(this.currentActivity.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/activity']);
        },
        error => {
          console.log(error);
        });
  }
}
