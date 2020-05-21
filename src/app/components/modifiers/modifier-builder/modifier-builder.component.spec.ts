import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBuilderComponent } from './modifier-builder.component';

describe('ModifierBuilderComponent', () => {
  let component: ModifierBuilderComponent;
  let fixture: ComponentFixture<ModifierBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
