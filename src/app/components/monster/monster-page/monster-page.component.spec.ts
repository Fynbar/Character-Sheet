import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterPageComponent } from './monster-page.component';

describe('MonsterPageComponent', () => {
  let component: MonsterPageComponent;
  let fixture: ComponentFixture<MonsterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
