import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentComponent } from './equipment.component';
// import { JSONService } from '..';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { JSONService } from 'src/app/services/json.service';
import { Item, monetaryUnit, EquipmentCategory } from 'src/models/equipment/equipment.model';
import { Table, TableModule } from '../../../../node_modules/primeng/Table/table';
import { Dropdown, DropdownModule } from '../../../../node_modules/primeng/Dropdown/dropdown';


describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;
  let serviceSpy: jasmine.SpyObj<JSONService>;

  beforeEach(async(() => {
    serviceSpy = jasmine.createSpyObj('JSONService', ['sayHi', 'getEquipmentJSON', 'getAllEmployees']);
    // serviceSpy.sayHi.and.returnValue(of('l'));
    serviceSpy.getEquipmentJSON.and.returnValue(of<Item[]>(
      [{
        name: 'shirt',
        cost: { unit: monetaryUnit.Gp, quantity: 2 },
        equipmentCategory: EquipmentCategory.Armor,
        weight: 3
      }]));

    TestBed.configureTestingModule({
      declarations: [EquipmentComponent],
      providers: [{
        provide: JSONService,
        useValue: serviceSpy
      }],
      imports: [
        HttpClientModule,
        Table,
        TableModule,
        Dropdown,
        DropdownModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
