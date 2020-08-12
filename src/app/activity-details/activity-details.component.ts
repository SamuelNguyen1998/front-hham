import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from '../_models/Option';
import { Activity } from '../_models/Activity';
import { AuthService } from '../_services/auth.service';
import { OptionService } from '../_services/option.service';
import { ActivityService } from '../_services/activity.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: [ './activity-details.component.scss' ]
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity = {
    archivedOn: undefined, createdOn: undefined, id: 0, lockedOn: undefined, projectId: 0,
    name: '',
    description: ''
  };
  newActivity: Activity;
  options: Option[];
  newOption: Option = this.createEmptyOption();
  updatedOption: Option = this.createEmptyOption();
  errorMessage = '';
  successMessage = '';
  isInActivityEditMode = false;
  isAddOptionFormVisible = false;
  isInOptionEditMode = false;
  idOfTheOptionToDelete: number;

  createEmptyOption(): Option {
    return {
      createdOn: undefined, id: undefined,
      activityId: this.activity.id,
      name: '',
      image: '',
      price: 0,
    };
  }

  constructor(public auth: AuthService,
              private activityService: ActivityService,
              private optionService: OptionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadActivity(this.route.snapshot.params.id);
  }

  loadActivity(id): void {
    this.activityService.get(id).subscribe(
      response => {
        this.activity = response.data;
        this.loadOptions(id);
      },
      error => {
        this.errorMessage = 'Failed loading activity information';
        console.log(error);
      }
    );
  }

  loadOptions(activityId: number): void {
    this.optionService.findOptions(activityId).subscribe(
      response => this.options = response.data,
      error => {
        this.errorMessage = 'Failed loading options in this activity';
        console.log(error);
      }
    );
  }

  archive(): void {
    this.activityService.archive(this.activity.id).subscribe(
      () => this.router.navigate([ '/activities' ]),
      error => {
        this.errorMessage = 'Failed archiving activity';
        console.log(error);
      }
    );
  }

  enterActivityEditMode(): void {
    this.isInActivityEditMode = true;
    this.newActivity = { ...this.activity };
  }

  saveActivityEdit(): void {
    this.activityService.update(this.newActivity.id, this.newActivity).subscribe(
      response => {
        this.activity = this.newActivity;
        this.successMessage = 'The activity was updated successfully!';
        this.isInActivityEditMode = false;
      },
      error => {
        this.errorMessage = 'Failed updating activity information';
        console.log(error);
      }
    );
  }

  cancelActivityEdit(): void {
    this.isInActivityEditMode = false;
  }


  beginEditOption(id: number): void {
    this.updatedOption = { ...this.options.find(element => element.id === id) };
    this.isInOptionEditMode = true;
  }

  finishEditOption(id: number): void {
    this.optionService.update(id, this.updatedOption).subscribe(
      () => {
        const index = this.options.findIndex(element => element.id === id);
        this.options[index] = { ...this.updatedOption };
        this.isInOptionEditMode = false;
      },
      error => {
        this.errorMessage = 'Failed saving option changes';
        console.log(error);
      }
    );
  }

  cancelEditOption(): void {
    this.isInOptionEditMode = false;
  }

  captureOptionIdForDeletion(id: number): void {
    this.idOfTheOptionToDelete = id;
  }

  deleteOption(): void {
    const id = this.idOfTheOptionToDelete;
    this.optionService.delete(id).subscribe(
      () => {
        this.options = this.options.filter(option => option.id !== id);
        this.successMessage = 'Successfully deleted option';
      },
      error => {
        this.errorMessage = 'Failed deleting option';
        console.log(error);
      }
    );
  }

  vote(id: number): void {
    this.optionService.vote(id).subscribe(
      () => {
        // TODO: Mark option as voted
        this.successMessage = 'The Option was voted successfully!';
      },
      error => {
        this.errorMessage = 'Failed voting';
        console.log(error);
      }
    );
  }

  showAddOptionForm(): void {
    this.isAddOptionFormVisible = true;
    this.newOption = this.createEmptyOption();
  }

  finishAddOption(): void {
    this.optionService.create(this.newOption).subscribe(
      response => {
        this.isAddOptionFormVisible = false;
        this.successMessage = 'New option created successfully';
        this.options.push({ ...this.newOption });
      },
      error => {
        this.errorMessage = 'Failed creating new option';
        console.log(error);
      }
    );
  }

  cancelAddOption(): void {
    this.isAddOptionFormVisible = false;
  }
}
