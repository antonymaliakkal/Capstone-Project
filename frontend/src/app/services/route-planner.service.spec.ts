import { TestBed } from '@angular/core/testing';

import { RoutePlannerService } from './route-planner.service';

describe('RoutePlannerService', () => {
  let service: RoutePlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutePlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
