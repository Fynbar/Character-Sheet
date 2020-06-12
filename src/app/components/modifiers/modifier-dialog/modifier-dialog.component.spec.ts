import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDialogComponent } from './modifier-dialog.component';

describe('ModifyDialogComponent', () => {
  let component: ModifierDialogComponent;
  let fixture: ComponentFixture<ModifierDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
