import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterBuilderComponent } from './monster-builder.component';

describe('MonsterBuilderComponent', () => {
  let component: MonsterBuilderComponent;
  let fixture: ComponentFixture<MonsterBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
