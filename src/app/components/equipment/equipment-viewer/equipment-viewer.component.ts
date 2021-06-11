import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/models/equipment/equipment.model';

@Component({
  selector: 'app-equipment-viewer',
  templateUrl: './equipment-viewer.component.html',
  styleUrls: ['./equipment-viewer.component.css']
})
export class EquipmentViewerComponent implements OnInit {
  @Input() piece: Item;
  constructor() { }

  ngOnInit() {
  }

}
