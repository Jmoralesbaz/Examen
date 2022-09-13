import { TestBed } from '@angular/core/testing';

import { BaseServicioService } from './base-servicio.service';

describe('BaseServicioService', () => {
  let service: BaseServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
