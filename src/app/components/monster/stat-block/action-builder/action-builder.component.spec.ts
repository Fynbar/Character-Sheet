import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBuilderComponent } from './action-builder.component';
import { AccordionModule } from 'primeng/accordion/accordion.d';
import { DropdownModule } from 'primeng/dropdown/dropdown.d';

describe('ActionBuilderComponent', () => {
  let component: ActionBuilderComponent;
  let fixture: ComponentFixture<ActionBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBuilderComponent],
      imports: [AccordionModule, DropdownModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
