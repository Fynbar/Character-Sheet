import { Component, OnInit } from '@angular/core';
import { JSONService } from '../../json.service';
import { MonsterMonMan } from '../monster-builder/monster-builder.component';
import { insertString } from '../../../common/string.functions';
import { abilityAbbrev } from 'src/models/ability.enum';
import { MonsterCreature } from '../monster-builder/monsterCreature';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-monster-page',
  templateUrl: './monster-page.component.html',
  styleUrls: ['./monster-page.component.css']
})
export class MonsterPageComponent implements OnInit {
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'challenge', header: 'CR' },
    { field: 'armorClass', header: 'AC' },
  ];
  constructor(
    private jsonService: JSONService
  ) { }
  public monsters: MonsterCreature[];
  public expandedRows = {};
  // private temp: MonsterMonMan[] = [];


  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    // console.log(data);
    this.jsonService.getJSON('mon_man_addition').pipe(map(mon => mon.map(m => MonsterCreature.fromPageDesc(m)))).subscribe(data => {
      this.monsters = data;
      this.expandedRows[this.monsters[0].name] = true;
    });
  }
}
