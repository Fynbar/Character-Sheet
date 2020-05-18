import { TestBed, async } from '@angular/core/testing';

import { PythonService } from './python.service';
import { HttpClientModule } from '@angular/common/http';

describe('PythonService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientModule
      ],
      declarations: [],
    }).compileComponents();
  }));
  beforeEach(() => TestBed.configureTestingModule({}));



  it('should be created', () => {
    const service: PythonService = TestBed.get(PythonService);
    expect(service).toBeTruthy();
  });

});
