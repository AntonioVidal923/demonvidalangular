import { TestBed } from '@angular/core/testing';

import { BusquedaserviceService } from './busquedaservice.service';

describe('BusquedaserviceService', () => {
  let service: BusquedaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
