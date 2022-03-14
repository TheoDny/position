import { TestBed } from '@angular/core/testing';

import { FfvbService } from './ffvb.service';

describe('FfvbService', () => {
  let service: FfvbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfvbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
