import { TestBed } from '@angular/core/testing';

import { ManufacturedService } from './manufactured.service';

describe('ManufacturedService', () => {
  let service: ManufacturedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
