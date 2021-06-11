import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentViewerComponent } from './equipment-viewer.component';

describe('EquipmentViewerComponent', () => {
  let component: EquipmentViewerComponent;
  let fixture: ComponentFixture<EquipmentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
