import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityService } from "../../_services/activity.service";
import { OptionService } from "../../_services/option.service";

@Component({
  selector: 'app-detailed-activity',
  templateUrl: './detailed-activity.component.html',
  styleUrls: [ './detailed-activity.component.scss' ]
})
export class DetailedActivityComponent implements OnInit {
  currentActivity = null;
  message = '';
  id: any;
  Optionss: any;
  activityForm: FormGroup = this.formBuilder.group({
    name: '',
    description: '',
    options: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder,
              private activityService: ActivityService,
              private optionService: OptionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getActivity(this.route.snapshot.paramMap.get('id'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadOption();
  }

  getActivity(id): void {
    this.activityService.get(id).subscribe(
      response => this.currentActivity = response.data,
      error => console.log(error)
    );
  }

  onSubmit() {
    console.log(this.activityForm.value);
  }

  addOption() {
    const control = <FormArray>this.activityForm.controls['options'];
    this.options().push(this.newOption());
  }

  options(): FormArray {
    return this.activityForm.get("options") as FormArray
  }

  newOption(): FormGroup {
    return this.formBuilder.group({
      id: 0,
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
        this.router.navigate([ '/activities' ]);
      },
      error => {
        console.log(error);
      }
    );
  }

  loadOption(): void {
    this.optionService
      .findOptions(this.id)
      .subscribe(response => {
        this.Optionss = response.data
        for (let opt of this.Optionss) {
          this.options().push(this.formBuilder.group({
            id: opt.id,
            nameOption: opt.name,
            image: opt.image,
            price: opt.price
          }))
        }
      });
  }

  voteOption(index: number): void{
    //console.log(this.options().at(index).value.id);
    this.optionService.vote(this.options().at(index).value.id).subscribe(
      response => {
        console.log(response);
        this.message = 'The Option was voted successfully!';
      },
      error => {
        console.log(error);
      }
    );
  }
}
