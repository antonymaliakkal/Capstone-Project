import { TestBed } from '@angular/core/testing';

import { CombinedRouteMapService } from './combined-route-map.service';

describe('CombinedRouteMapService', () => {
  let service: CombinedRouteMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinedRouteMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
