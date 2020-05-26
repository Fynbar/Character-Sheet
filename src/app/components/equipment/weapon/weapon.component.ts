import { Component, OnInit, Input } from '@angular/core';
import { Weapon } from 'src/models/equipment/weapon.model';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {
  @Input() weapon: Weapon;
  constructor() { }

  ngOnInit() {
  }
}
