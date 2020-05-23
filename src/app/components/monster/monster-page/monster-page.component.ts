import { Component, OnInit } from '@angular/core';
import { JSONService } from '../../../services/json.service';
import { MonsterMonMan } from '../../../../models/monsters/mon-man-text-monster/monsterMonMan';
import { insertString } from '../../../common/string.functions';
import { abilityAbbrev } from 'src/models/rules/ability.enum';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
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
