import { TestBed } from '@angular/core/testing';

import { HeaderUpdateService } from './header-update.service';

describe('HeaderUpdateService', () => {
  let service: HeaderUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
