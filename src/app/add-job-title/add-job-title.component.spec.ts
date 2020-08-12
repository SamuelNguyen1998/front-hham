import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobTitleComponent } from './add-job-title.component';

describe('AddJobTitleComponent', () => {
  let component: AddJobTitleComponent;
  let fixture: ComponentFixture<AddJobTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
