import { TestBed } from '@angular/core/testing';

import { ExpresionesRegularesService } from '../expresionesRegulares/expresiones-regulares.service';

describe('ExpresionesRegularesService', () => {
  let service: ExpresionesRegularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpresionesRegularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
