import { TestBed } from '@angular/core/testing';

import { HolaMundoService } from './hola-mundo.service';

describe('HolaMundoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HolaMundoService = TestBed.get(HolaMundoService);
    expect(service).toBeTruthy();
  });
});
