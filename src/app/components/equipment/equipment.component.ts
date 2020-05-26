import { Component, OnInit, ViewChild } from '@angular/core';
import { JSONService } from '../../services/json.service';
import { Item, EquipmentCategory } from '../../../models/equipment/equipment.model';
import { Columns, generateFieldHTML } from './Column';
import { enumKeysArray } from '../../common/enumKeysArray';
import { Table } from 'primeng/Table/table';
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
  { field: 'equipment_category', header: 'Equipment Category' },
  { field: 'cost', header: 'Cost' },
  { field: 'weight', header: 'Weight' }];
  constructor(
    private jsonService: JSONService
  ) { }
  public checked = true;
  public items: Item[] = [];
  public categories = [{ label: 'All Categories', value: null }].concat(...categoriesNames);
  public weightFilter: number[] = [null, null];
  public weightTimeout;
  public weightSlider: number[] = [null, null];

  ngOnInit() {
    this.jsonService.getEquipmentJSON().subscribe(data => {
      // const weights = data.map(w => w.weight ? w.weight : 0);
      // this.weightSlider = [Math.min(...weights), Math.max(...weights)];
      // this.weightFilter = [null, Math.max(...weights)];
      this.items = data;
      // console.log(data);

    });
    // console.log(categoriesNames);
  }
  // get showWeightX() {
  //   return this.weightFilter[0] || this.weightFilter[1] === this.weightSlider[1];
  // }
  // onWeightChange(event, dt) {
  //   console.log(event);
  //   if (this.weightTimeout) {
  //     clearTimeout(this.weightTimeout);
  //   }

  //   this.weightTimeout = setTimeout(() => {
  //     dt.filter(event.values, 'weight', 'inRange');
  //     // dt.filter(event.values[1], 'weight', 'lte');
  //   }, 250);
  // }
}
