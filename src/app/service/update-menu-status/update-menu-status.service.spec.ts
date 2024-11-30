import { TestBed } from '@angular/core/testing';

import { UpdateMenuStatusService } from './update-menu-status.service';

describe('UpdateMenuStatusService', () => {
  let service: UpdateMenuStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMenuStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
