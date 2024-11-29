import { TestBed } from '@angular/core/testing';

import { AddToSavedService } from './add-to-saved.service';

describe('AddToSavedService', () => {
  let service: AddToSavedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToSavedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
