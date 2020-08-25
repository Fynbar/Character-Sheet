import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterViewerComponent } from './encounter-viewer.component';

describe('EncounterViewerComponent', () => {
  let component: EncounterViewerComponent;
  let fixture: ComponentFixture<EncounterViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
