import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterComponent } from './monster.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MonsterComponent', () => {
  let component: MonsterComponent;
  let fixture: ComponentFixture<MonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterComponent],
      imports: [
        RouterTestingModule,
        // MenubarModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
