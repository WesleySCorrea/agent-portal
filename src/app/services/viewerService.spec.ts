import { TestBed } from '@angular/core/testing';

import { viewerService } from './viewerService';

describe('Viewer', () => {
  let service: viewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(viewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
