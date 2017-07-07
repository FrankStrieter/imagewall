import { TestBed, inject } from '@angular/core/testing';

import { ImagehandlerService } from './imagehandler.service';

describe('ImagehandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagehandlerService]
    });
  });

  it('should ...', inject([ImagehandlerService], (service: ImagehandlerService) => {
    expect(service).toBeTruthy();
  }));
});
