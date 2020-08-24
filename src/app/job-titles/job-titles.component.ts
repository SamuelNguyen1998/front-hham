import { Component, OnInit } from '@angular/core';
import { JobTitle } from '../_models/JobTitle';
import { AuthService } from '../_services/auth.service';
import { JobTitleService } from '../_services/job-title.service';
import { DataValidatorService } from "../_services/data-validator.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './job-titles.component.html',
  styleUrls: [ './job-titles.component.scss' ]
})
export class JobTitlesComponent implements OnInit {
  jobTitles: JobTitle[];
  visibleJobTitles: JobTitle[];
  successMessage: string;
  errorMessage: string;
  idOfTheJobTitleToArchive: number;
  isInEditMode = false;
  searchTerm = '';
  editingJobTitle: JobTitle = { name: '', monthlyAmount: 0 };
  editingJobTitleId: number;
  touched = { name: false, monthlyAmount: false };

  constructor(public auth: AuthService,
              private jobService: JobTitleService,
              private validate: DataValidatorService) {
  }

  ngOnInit(): void {
    this.retrieveJobs();
  }

  retrieveJobs(): void {
    this.jobService.getAll().subscribe(
      response => {
        this.jobTitles = response.data;
        this.visibleJobTitles = this.jobTitles;
      },
      errorResponse => {
        this.errorMessage = errorResponse.error.message;
      }
    );
  }

  confirmArchive(id: number): void {
    this.idOfTheJobTitleToArchive = id;
  }

  archive(): void {
    this.jobService.archive(this.idOfTheJobTitleToArchive).subscribe(
      response => {
        this.jobTitles = this.jobTitles.filter(jobTitle => jobTitle.id !== response.data.id);
        this.visibleJobTitles = this.jobTitles;
        this.successMessage = `Successfully archived job ${ response.data.name }`;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  isValidName(): boolean {
    return this.validate.nonEmpty(this.editingJobTitle.name);
  }

  keyPressOnAmount(event: KeyboardEvent): void {
    this.validate.numberKeyPress(event, this.editingJobTitle.monthlyAmount?.toString());
  }

  isValidAmount(): boolean {
    return this.validate.nonNegative(this.editingJobTitle.monthlyAmount);
  }

  cancelEdit(): void {
    this.isInEditMode = false;
  }

  beginEdit(id: number): void {
    this.touched = { name: false, monthlyAmount: false };
    this.editingJobTitle = { ...this.jobTitles.find(jobTitle => jobTitle.id === id) };
    this.editingJobTitleId = id;
    this.isInEditMode = true;
  }

  saveEdit(): void {
    const id = this.editingJobTitle.id;
    this.jobService.update(this.editingJobTitle).subscribe(
      response => {
        this.isInEditMode = false;
        const index = this.jobTitles.findIndex(jobTitle => jobTitle.id === id);
        this.jobTitles[index] = response.data;
        this.successMessage = `Successfully updated job title ${ response.data.name }`;
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  searchByName(): void {
    if (this.searchTerm === '') {
      this.visibleJobTitles = this.jobTitles;
      return;
    }
    this.visibleJobTitles = this.jobTitles.filter(
      jobTitle => jobTitle.name.indexOf(this.searchTerm) >= 0
    );
    // Don't know why Angular doesn't trigger resize event when model changes.
    // This event is used to trigger footer repositioning.
    document.body.dispatchEvent(new Event('resize'));
  }

  clearSuccessMessage(): void {
    this.successMessage = '';
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }
}
