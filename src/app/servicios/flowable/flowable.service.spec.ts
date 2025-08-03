import { TestBed } from '@angular/core/testing';

import { FlowableService } from './flowable.service';

describe('FlowableService', () => {
  let service: FlowableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
