import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from '../_models/Option';
import { Activity } from '../_models/Activity';
import { AuthService } from '../_services/auth.service';
import { OptionService } from '../_services/option.service';
import { ActivityService } from '../_services/activity.service';
import { Vote } from "../_models/Vote";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: [ './activity-details.component.scss' ]
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity = {
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
  idOfTheOptionEditing: number;
  voteMadeInThisActivity: Vote;
  votedOptionId: number;
  notes = {};

  createEmptyOption(): Option {
    return {
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
    const activityId: number = this.route.snapshot.params.id;
    this.loadActivity(activityId);
    this.optionService.getVoteInActivity(activityId, this.auth.user.id).subscribe(
      response => {
        const votes: Vote[] = response.data;
        if (votes.length === 1) {
          this.voteMadeInThisActivity = votes[0];
        }
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  loadActivity(id): void {
    this.activityService.get(id).subscribe(
      response => {
        this.activity = response.data;
        this.loadOptions(id);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  loadOptions(activityId: number): void {
    this.optionService.findOptions(activityId).subscribe(
      response => {
        this.options = response.data;
        this.options.forEach(option => this.notes[option.id] = '');
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  archive(): void {
    this.activityService.archive(this.activity.id).subscribe(
      () => this.router.navigate([ '/activities' ]),
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  finishActivity(): void {
    this.activityService.finish(this.activity.id).subscribe(
      () => this.router.navigate([ "/activities" ]),
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
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  cancelActivityEdit(): void {
    this.isInActivityEditMode = false;
  }


  beginEditOption(id: number): void {
    this.updatedOption = { ...this.options.find(element => element.id === id) };
    this.isInOptionEditMode = true;
    this.idOfTheOptionEditing = id;
  }

  finishEditOption(id: number): void {
    this.optionService.update(id, this.updatedOption).subscribe(
      () => {
        const index = this.options.findIndex(element => element.id === id);
        this.options[index] = { ...this.updatedOption };
        this.isInOptionEditMode = false;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  cancelEditOption(): void {
    this.isInOptionEditMode = false;
  }

  captureOptionIdForDeletion(id: number): void {
    this.idOfTheOptionToDelete = id;
  }

  deleteOption(): void {
    this.optionService.delete(this.idOfTheOptionToDelete).subscribe(
      response => {
        this.options = this.options.filter(option => option.id !== response.data.id);
        this.successMessage = 'Successfully deleted option ${response.data.name}';
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  vote(id: number): void {
    this.optionService.vote(id, this.auth.user.id, this.notes[id]).subscribe(
      response => this.voteMadeInThisActivity = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
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
        this.options.push({ ...this.newOption });
        this.successMessage = 'New option created successfully';
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  cancelAddOption(): void {
    this.isAddOptionFormVisible = false;
  }

  lockActivity(): void {
    this.activityService.lock(this.activity.id).subscribe(
      response => {
        this.successMessage = 'Successfully archived this activity';
        this.activity = response.data;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  voted(optionId: number): boolean {
    return this.voteMadeInThisActivity && this.voteMadeInThisActivity.optionId === optionId;
  }
}
