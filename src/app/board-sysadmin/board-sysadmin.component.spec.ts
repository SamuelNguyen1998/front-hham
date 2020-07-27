import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSysadminComponent } from './board-sysadmin.component';

describe('BoardSysadminComponent', () => {
  let component: BoardSysadminComponent;
  let fixture: ComponentFixture<BoardSysadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSysadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSysadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
