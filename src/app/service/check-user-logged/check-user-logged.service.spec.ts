import { TestBed } from '@angular/core/testing';

import { CheckUserLoggedService } from './check-user-logged.service';

describe('CheckUserLoggedService', () => {
  let service: CheckUserLoggedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUserLoggedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
