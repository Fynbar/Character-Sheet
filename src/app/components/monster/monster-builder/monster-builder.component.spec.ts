import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonsterBuilderComponent } from './monster-builder.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { JSONService } from 'src/app/services/json.service';
import { MonsterMonMan } from 'src/models/monsters/mon-man-text-monster/monsterMonMan';
import { InputSwitch, InputSwitchModule } from '../../../../../node_modules/primeng/InputSwitch/public_api';
import { ButtonModule, Button } from '../../../../../node_modules/primeng/Button/button';
import { TableModule, Table } from '../../../../../node_modules/primeng/Table/table';
import { Accordion, AccordionModule } from '../../../../../node_modules/primeng/Accordion/accordion';
import { CheckboxModule, Checkbox } from '../../../../../node_modules/primeng/Checkbox/checkbox';

describe('MonsterBuilderComponent', () => {
  let component: MonsterBuilderComponent;
  let fixture: ComponentFixture<MonsterBuilderComponent>;
  let serviceSpy: jasmine.SpyObj<JSONService>;

  beforeEach(async(() => {
    serviceSpy = jasmine.createSpyObj('JSONService', ['sayHi', 'getJSON', 'getAllEmployees']);
    // serviceSpy.sayHi.and.returnValue(of('l'));
    serviceSpy.getJSON.and.returnValue(of<MonsterMonMan[]>(
      [{
        name: 'shirt',
        page: 69,
        page_desc: 'Description',
        see: null
      }]));

    TestBed.configureTestingModule({
      declarations: [MonsterBuilderComponent],
      providers: [{
        provide: JSONService,
        useValue: serviceSpy
      }],
      imports: [
        HttpClientModule,
        InputSwitch, InputSwitchModule,
        Button, ButtonModule,
        Table, TableModule,
        Accordion, AccordionModule,
        // Module,
        Checkbox, CheckboxModule
      ]
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
