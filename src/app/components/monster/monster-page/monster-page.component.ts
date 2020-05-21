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
  // private temp: MonsterMonMan[] = [];


  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    // console.log(data);
    this.jsonService.getJSON('mon_man_addition').pipe(map(mon => mon.map(m => MonsterCreature.fromPageDesc(m)))).subscribe(data => {
      this.monsters = data;
    });
  }

  public readPageDesc(str: MonsterMonMan): MonsterMonMan {
    let s = str.page_desc ? str.page_desc : '';
    // tslint:disable-next-line:max-line-length
    let findIndecies = ['Speed', 'Languages', 'Damage Immunities', 'Condition Immunities', 'Damage Resistances', 'Senses', 'Skills', 'Challenge', 'Hit Points', 'Armor Class', 'Damage Vulnerabilities', 'Saving Throws', 'Damage Resistance'].concat(abilityAbbrev);
    let indecies = findIndecies.map(find =>
      s.indexOf(find)
    ).filter(n => n >= 0).sort((a, b) => a > b ? 1 : -1);
    let newLine = '\n';
    indecies.forEach((found, index) => s = insertString(s, newLine, found + index));
    str.page_desc = s;
    // console.log(str);
    findIndecies = ['ACTIONS', 'REACTIONS', 'LEGENDARY ACTIONS'];
    indecies = findIndecies.map(find =>
      s.indexOf(find)
    ).filter(n => n >= 0).sort((a, b) => a > b ? 1 : -1);

    newLine = '\n';
    indecies.forEach((found, index) => {
      s = insertString(s, newLine, found + index);
      s = insertString(s, newLine, found + findIndecies[index].length + 2 * (index + 1));
    });
    str.page_desc = s;
    return str;
  }
}
