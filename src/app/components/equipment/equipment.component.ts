import { Component, OnInit, ViewChild } from '@angular/core';
import { JSONService } from '../../services/json.service';
import { Item, EquipmentCategory } from '../../../models/equipment/equipment.model';
import { Columns, generateFieldHTML } from './column.model';
import { enumKeysArray } from '../../common/enumKeysArray';
import { Table } from 'primeng/table/table.d';
import { FilterUtils } from 'primeng/utils';


const categoriesNames = ['Adventuring Gear',
  'Tools',
  'Armor',
  'Mounts and Vehicles',
  'Weapon']
  // enumKeysArray(EquipmentCategory)
  .map(ec => ({ label: ec, value: ec }));
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})


export class EquipmentComponent implements OnInit {
  @ViewChild('eqt') tableRef;
  cols: Columns = [{ field: 'name', header: 'Name' },
  { field: 'equipmentCategory', header: 'Equipment Category' },
  { field: 'cost', header: 'Cost' },
  { field: 'weight', header: 'Weight' }];
  constructor(
    private jsonService: JSONService
  ) { }
  public checked = true;
  public items: Item[] = [];
  public categories = [{ label: 'All Categories', value: null }].concat(...categoriesNames);


  ngOnInit() {
    this.jsonService.getEquipmentJSON().subscribe(data => {
      this.items = data;
    });
  }
}
