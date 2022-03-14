import { TestBed } from '@angular/core/testing';

import { SystemeService } from './systeme.service';

describe('SystemeService', () => {
  let service: SystemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
