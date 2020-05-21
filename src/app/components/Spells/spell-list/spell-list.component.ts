import { Component, OnInit, Input } from '@angular/core';
import { Spells, Spell } from 'src/models/spell.model';


@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.css']
})
export class SpellListComponent implements OnInit {
  @Input() spellList: Spells;
  @Input() spellLevel: number;
  spells: Spells;
  cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
  ];

  constructor() { }



  ngOnInit() {
    // this.spells = this.spellList.filter(s => s.level === this.spellLevel || (s.level <= this.spellLevel && s.higher_level));
  }
}
