import { TestBed } from '@angular/core/testing';

import { JobTitleService } from './job-title.service';

describe('JobService', () => {
  let service: JobTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
