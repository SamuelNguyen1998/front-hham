import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedActivityComponent } from './detailed-activity.component';

describe('DetailedActivityComponent', () => {
  let component: DetailedActivityComponent;
  let fixture: ComponentFixture<DetailedActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
