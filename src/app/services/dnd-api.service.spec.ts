import { TestBed } from '@angular/core/testing';

import { DndApiService } from './dnd-api.service';

describe('DndApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DndApiService = TestBed.get(DndApiService);
    expect(service).toBeTruthy();
  });
});
