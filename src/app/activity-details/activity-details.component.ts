import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vote } from "../_models/Vote";
import { User } from '../_models/User';
import { Option } from '../_models/Option';
import { Activity } from '../_models/Activity';
import { AuthService } from '../_services/auth.service';
import { OptionService } from '../_services/option.service';
import { ActivityService } from '../_services/activity.service';
import { ImageService } from "../_services/image.service";
import { Constants } from "../Constants";

declare var jQuery: any;

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: [ './activity-details.component.scss' ]
})
export class ActivityDetailsComponent implements OnInit {
  backendServer = Constants.BACKEND_SERVER;
  activity: Activity = {
    name: '',
    description: ''
  };
  admins: User[];

  errorMessage = '';
  successMessage = '';

  options: Option[];
  notes: { [key: number]: string } = {};
  voteMadeInThisActivity: Vote;
  optionSelectedToDelete: Option;
  notificationRecipients: string[] = null;

  isActivityEditing = false;
  newActivity: Activity;

  createTouched = { name: false, price: false };
  isAddOptionFormVisible = false;
  newOption: Option = this.createEmptyOption();
  newOptionImageUrl = '';
  newOptionImageUrlTouched = false;

  editTouched = { name: false, price: false, url: false };
  isInOptionEditMode = false;
  idOfTheOptionEditing: number;
  editingOptions: { [key: number]: Option } = {};
  editingOptionsImageUrl: { [key: number]: string } = {};
  editingOptionsImageUrlEnabled: { [key: number]: boolean } = {};

  votes: Vote[];
  members: User[];

  createEmptyOption(): Option {
    return {
      activityId: this.activity.id,
      name: '',
      price: 500,
    };
  }

  constructor(public auth: AuthService,
              private activityService: ActivityService,
              private optionService: OptionService,
              private imageService: ImageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const activityId: number = this.route.snapshot.params.id;
    this.loadActivity(activityId);
    this.loadProjectAdmins(activityId);
    this.loadMembers(activityId);
    this.loadVotes(activityId);
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

  get membersNotVoted(): User[] {
    return this.members
      ?.filter(member => !this.votes?.some(vote => vote.userId === member.id))
      ?.filter(member => !member.admin);
  }

  getUserById(id: number): User {
    return this.members?.find(member => member.id === id);
  }

  getOptionById(id: number): Option {
    return this.options?.find(option => option.id === id);
  }

  currentUserCanEdit(): boolean {
    return this.admins?.some(admin => admin.id === this.auth.user.id);
  }

  isOptionVotedByCurrentUser(optionId: number): boolean {
    return this.votes?.some(vote => vote.optionId === optionId && vote.userId === this.auth.user.id);
  }

  loadVotes(activityId: number): void {
    this.activityService.getVotes(activityId).subscribe(
      response => this.votes = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  loadMembers(activityId: number): void {
    this.activityService.getMembers(activityId).subscribe(
      response => this.members = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message,
    );
  }

  loadProjectAdmins(activityId: number): void {
    this.activityService.getAdmins(activityId).subscribe(
      response => this.admins = response.data,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  loadActivity(id: number): void {
    this.activityService.get(id).subscribe(
      response => {
        this.activity = response.data;
        this.loadOptions(id);
      },
      errorResponse => {
        this.errorMessage = errorResponse.error.message;
        this.router.navigate([ '/404' ]);
      }
    );
  }

  loadOptions(activityId: number): void {
    this.optionService.findOptions(activityId).subscribe(
      response => {
        this.options = response.data;
        this.options.forEach(option => {
          this.notes[option.id] = '';
          this.editingOptions[option.id] = { ...option };
          this.editingOptionsImageUrl[option.id] = '';
          this.editingOptionsImageUrlEnabled[option.id] = false;
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
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  enterActivityEditMode(): void {
    this.isActivityEditing = true;
    this.newActivity = { ...this.activity };
  }

  saveActivityEdit(): void {
    this.activityService.update(this.newActivity.id, this.newActivity).subscribe(
      response => {
        this.activity = response.data;
        this.successMessage = 'The activity has been updated successfully';
        this.isActivityEditing = false;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  cancelActivityEdit(): void {
    this.isActivityEditing = false;
  }


  beginEditOption(id: number): void {
    this.isInOptionEditMode = true;
    this.idOfTheOptionEditing = id;
    this.editTouched = { name: false, price: false, url: false };
    // Clear old inputs
    this.editingOptions[id] = { ...this.options.find(option => option.id === id) };
    this.editingOptionsImageUrl[id] = '';
    this.editingOptionsImageUrlEnabled[id] = false;
  }

  finishEditOption(id: number): void {
    if (this.editingOptionsImageUrlEnabled[id] && !this.isValidUrl(this.editingOptionsImageUrl[id]) ||
      !this.isValidOptionName(this.editingOptions[id]) ||
      !this.isValidOptionPrice(this.editingOptions[id].price)) {
      this.editTouched = { url: true, price: true, name: true };
      return;
    }
    this.optionService.update(this.editingOptions[id]).subscribe(
      response => {
        const index = this.options.findIndex(element => element.id === response.data.id);
        this.isInOptionEditMode = false;
        if (!this.editingOptionsImageUrlEnabled[id]) {
          this.options[index] = response.data;
        } else {
          const url = this.editingOptionsImageUrl[id];
          this.imageService.postForOption(id, url).subscribe(
            imageResponse => {
              // Need to duplicate this line here to wait for the upload
              // to finish before updating the option on the screen
              this.options[index] = response.data;
              this.options[index].image = imageResponse.data;
            },
            errorImageResponse => {
              this.options[index] = response.data;
              this.errorMessage = errorImageResponse.error.message;
            }
          );
        }
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  cancelEditOption(): void {
    this.isInOptionEditMode = false;
    this.editTouched = { price: false, name: false, url: false };
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
    this.newOptionImageUrl = '';
    this.createTouched = { name: false, price: false };
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

  inputForCreateOptionFormIsValid(): boolean {
    return this.isValidOptionName(this.newOption) &&
      this.isValidOptionPrice(this.newOption.price) &&
      (this.newOptionImageUrl === '' || this.isValidUrl(this.newOptionImageUrl));
  }

  finishAddOption(event: Event): void {
    // Prevent submission when validation error occurs
    if (!this.inputForCreateOptionFormIsValid()) {
      this.createTouched = { name: true, price: true };
      event.stopPropagation();
      return;
    }
    this.optionService.create(this.activity.id, this.newOption).subscribe(
      response => {
        this.isAddOptionFormVisible = false;
        this.successMessage = 'New option created successfully';
        if (this.newOptionImageUrl === '') {
          this.options.push(response.data);
        } else {
          this.imageService.postForOption(response.data.id, this.newOptionImageUrl).subscribe(
            imageResponse => {
              const newOption = response.data;
              newOption.image = imageResponse.data;
              this.options.push(newOption);
            },
            errorImageResponse => {
              // Duplicated here to make the option visible only after the image is ready
              this.options.push(response.data);
              this.errorMessage = errorImageResponse.error.message;
            }
          );
        }
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

  unvote(optionId: number): void {
    this.optionService.unvote(this.auth.user.id, optionId).subscribe(
      response => this.voteMadeInThisActivity = null,
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  isValidUrl(url: string): boolean {
    return /^(ftp|https?):\/\/.+$/.test(url);
  }

  isUrlEditInputValid(id: number): boolean {
    return this.editTouched.url &&
      this.editingOptionsImageUrlEnabled[id] &&
      this.isValidUrl(this.editingOptionsImageUrl[id]);
  }

  isUrlEditInputInvalid(id: number): boolean {
    return this.editTouched.url &&
      this.editingOptionsImageUrlEnabled[id] &&
      !this.isValidUrl(this.editingOptionsImageUrl[id]);
  }

  keyPressOnNumberField(event: KeyboardEvent, oldValueAsString: string): void {
    // Decimal digits are accepted
    if (/\d/.test(event.key)) {
      return;
    }
    // Decimal point is allowed, but only once
    // if (event.key === "." && oldValueAsString?.indexOf(".") < 0) {
    //   return;
    // }
    // All other keys are rejected
    event.preventDefault();
    event.stopPropagation();
  }

  onPriceAddKeyPress(event: KeyboardEvent): void {
    this.keyPressOnNumberField(event, this.newOption.price?.toString());
  }

  onPriceEditKeyPress(event: KeyboardEvent, id: number): void {
    this.keyPressOnNumberField(event, this.editingOptions[id].price?.toString());
  }
}
