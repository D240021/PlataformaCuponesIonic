import { TestBed } from '@angular/core/testing';

import { MisCuponesService } from './mis-cupones.service';

describe('MisCuponesService', () => {
  let service: MisCuponesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisCuponesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
