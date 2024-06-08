import { TestBed } from '@angular/core/testing';

import { ControlPaginasService } from './control-paginas.service';

describe('ControlPaginasService', () => {
  let service: ControlPaginasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlPaginasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
