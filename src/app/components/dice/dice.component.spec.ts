import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceComponent } from './dice.component';
import { DialogModule } from 'primeng/dialog/dialog.d';
import { ButtonModule } from 'primeng/button/button.d';

describe('DiceComponent', () => {
  let component: DiceComponent;
  let fixture: ComponentFixture<DiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiceComponent],
      imports: [
        DialogModule,
        ButtonModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
