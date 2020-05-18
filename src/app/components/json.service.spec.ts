import { TestBed } from '@angular/core/testing';

import { JSONService } from './json.service';

describe('JSONService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JSONService = TestBed.get(JSONService);
    expect(service).toBeTruthy();
  });
});
