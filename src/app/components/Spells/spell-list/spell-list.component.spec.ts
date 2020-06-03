import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellListComponent } from './spell-list.component';
import { TableModule } from 'primeng/table/table.d';

describe('SpellListComponent', () => {
  let component: SpellListComponent;
  let fixture: ComponentFixture<SpellListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellListComponent ],
      imports: [TableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
