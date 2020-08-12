import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleDetailsComponent } from './job-title-details.component';

describe('JobTitleDetailsComponent', () => {
  let component: JobTitleDetailsComponent;
  let fixture: ComponentFixture<JobTitleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTitleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
