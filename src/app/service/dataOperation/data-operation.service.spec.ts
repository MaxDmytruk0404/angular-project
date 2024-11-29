import { TestBed } from '@angular/core/testing';

import { DataOperationService } from './data-operation.service';

describe('DataOperationService', () => {
  let service: DataOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
