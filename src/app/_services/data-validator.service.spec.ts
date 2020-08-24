import { TestBed } from '@angular/core/testing';

import { DataValidatorService } from './data-validator.service';

describe('DataValidatorService', () => {
  let service: DataValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
