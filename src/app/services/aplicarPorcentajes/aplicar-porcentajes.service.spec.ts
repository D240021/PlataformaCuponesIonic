import { TestBed } from '@angular/core/testing';

import { AplicarPorcentajesService } from '../aplicarPorcentajes/aplicar-porcentajes.service';

describe('AplicarPorcentajesService', () => {
  let service: AplicarPorcentajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicarPorcentajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
