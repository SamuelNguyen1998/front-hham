import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from '../_models/Option';
import { Activity } from '../_models/Activity';
import { AuthService } from '../_services/auth.service';
import { OptionService } from '../_services/option.service';
import { ActivityService } from '../_services/activity.service';
import { Vote } from "../_models/Vote";

declare var jQuery: any;

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
  editingOptions: { [key: number]: Option } = {};
  errorMessage = '';
  successMessage = '';
  isInActivityEditMode = false;
  isAddOptionFormVisible = false;
  isInOptionEditMode = false;
  idOfTheOptionEditing: number;
  voteMadeInThisActivity: Vote;
  optionSelectedToDelete: Option;
  notes = {};
  touched = { name: false, price: false };
  editTouched = { name: false, price: false };
  notificationRecipients: string[] = null;

  createEmptyOption(): Option {
    return {
      activityId: this.activity.id,
      name: '',
      image: '',
      price: 500,
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
        this.options.forEach(option => {
          this.notes[option.id] = '';
          this.editingOptions[option.id] = { ...option };
        });
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  cancel(): void {
    this.activityService.cancel(this.activity.id).subscribe(
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
        this.activity = response.data;
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
    this.isInOptionEditMode = true;
    this.idOfTheOptionEditing = id;
    this.editTouched = { name: false, price: false };
  }

  finishEditOption(id): void {
    this.optionService.update(this.editingOptions[id]).subscribe(
      response => {
        const index = this.options.findIndex(element => element.id === response.data.id);
        this.options[index] = response.data;
        this.isInOptionEditMode = false;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  cancelEditOption(): void {
    this.isInOptionEditMode = false;
  }

  captureOptionToDelete(id: number): void {
    this.optionSelectedToDelete = this.options.find(option => option.id === id);
  }

  deleteOption(): void {
    this.optionService.delete(this.optionSelectedToDelete.id).subscribe(
      response => {
        this.options = this.options.filter(option => option.id !== response.data.id);
        this.successMessage = `Successfully deleted option ${ response.data.name }`;
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
    this.touched = { name: false, price: false };
  }

  isEmptyOptionName(name: string): boolean {
    return name?.length === 0;
  }

  isDuplicatedOptionName(option: Option): boolean {
    return !!this.options.find(opt => opt.id !== option.id && opt.name === option.name);
  }

  isValidOptionName(option: Option): boolean {
    return !this.isEmptyOptionName(option.name) && !this.isDuplicatedOptionName(option);
  }

  isValidOptionPrice(price: number): boolean {
    return price >= 500;
  }

  finishAddOption(event: Event): void {
    // Prevent submission when validation error occurs
    if (!this.isValidOptionName(this.newOption) || !this.isValidOptionPrice(this.newOption.price)) {
      this.touched = { name: true, price: true };
      event.stopPropagation();
      return;
    }
    this.optionService.create(this.newOption).subscribe(
      response => {
        this.isAddOptionFormVisible = false;
        this.options.push(response.data);
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
        this.successMessage = 'Successfully locked voting on this activity';
        this.activity = response.data;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  unlockActivity(): void {
    this.activityService.unlock(this.activity.id).subscribe(
      response => {
        this.successMessage = 'Successfully unlocked voting on this activity';
        this.activity = response.data;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  voted(optionId: number): boolean {
    return this.voteMadeInThisActivity && this.voteMadeInThisActivity.optionId === optionId;
  }

  isActivityLocked(): boolean {
    return this.activity.lockedOn !== null;
  }

  sendNotificationEmails(): void {
    this.activityService.notify(this.activity.id).subscribe(
      response => {
        this.notificationRecipients = response.data;
        jQuery('#notificationEmailRecipientsDialog').modal('show');
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  isOptionEditing(id: number): boolean {
    return this.isInOptionEditMode && id === this.idOfTheOptionEditing;
  }

  isEmptyOptionNameInEdit(option: Option): boolean {
    return this.isOptionEditing(option.id) &&
      this.editTouched.name &&
      this.isEmptyOptionName(this.editingOptions[option.id]?.name);
  }

  isDuplicatedOptionNameInEdit(option: Option): boolean {
    return this.isOptionEditing(option.id) &&
      this.editTouched.name &&
      this.isDuplicatedOptionName(this.editingOptions[option.id]);
  }

  withdrawVote(optionId: number): void {
    this.optionService.withdrawVote(this.auth.user.id, optionId).subscribe(
      response => this.voteMadeInThisActivity = null,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }
}
