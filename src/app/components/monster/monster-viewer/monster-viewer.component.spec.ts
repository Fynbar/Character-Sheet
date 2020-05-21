import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterViewerComponent } from './monster-viewer.component';

describe('MonsterViewerComponent', () => {
  let component: MonsterViewerComponent;
  let fixture: ComponentFixture<MonsterViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
