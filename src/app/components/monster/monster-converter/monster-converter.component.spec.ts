import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterConverterComponent } from './monster-converter.component';

describe('MonsterConverterComponent', () => {
  let component: MonsterConverterComponent;
  let fixture: ComponentFixture<MonsterConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
