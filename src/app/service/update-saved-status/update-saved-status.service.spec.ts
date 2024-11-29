import { TestBed } from '@angular/core/testing';

import { UpdateSavedStatusService } from './update-saved-status.service';

describe('UpdateSavedStatusService', () => {
  let service: UpdateSavedStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSavedStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
