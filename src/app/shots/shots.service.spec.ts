import { TestBed, inject } from '@angular/core/testing';

import { ShotsService } from './shots.service';

describe('ShotsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShotsService]
    });
  });

  it('should be created', inject([ShotsService], (service: ShotsService) => {
    expect(service).toBeTruthy();
  }));
});
