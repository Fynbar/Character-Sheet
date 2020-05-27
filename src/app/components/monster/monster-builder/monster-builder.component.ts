import { Component, OnInit } from '@angular/core';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/rules/ability.enum';
import { APIMonster, Convert } from '../../../../models/monsters/api-monster/apiMonster.model';
import { JSONService } from '../../../services/json.service';
import { insertString } from '../../../common/string.functions';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { map, flatMap, tap } from 'rxjs/operators';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { MonsterMonMan } from 'src/models/monsters/mon-man-text-monster/monsterMonMan';
import { forkJoin } from 'rxjs';
import { Weapon } from 'src/models/equipment/weapon.model';
import { generateFieldHTML } from '../../equipment/column.model';

@Component({
  selector: 'app-monster-builder',
  templateUrl: './monster-builder.component.html',
  styleUrls: ['./monster-builder.component.css']
})

export class MonsterBuilderComponent implements OnInit {
  // , AfterViewInit
  // // @ViewChild('one') d1: ElementRef;
  // @ViewChild('one', { read: ElementRef }) d1: ElementRef;
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'page', header: 'Source' },
    { field: 'see', header: 'CR' },
  ];
  constructor(
    private jsonService: JSONService
  ) { }
  public checked = true;
  public apiMonsters: APIMonster[] = [];
  public jsonMonstersFormatted: MonsterCreature[] = [];
  public apiMonstersFormatted: MonsterCreature[] = [];
  // private temp: APIMonster[] = [];
  public jsonMonsters: MonsterMonMan[] = [];
  public weapons: Weapon[] = [];
  selectedMonsters = [];
  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    // console.log(generateFieldHTML(this.cols));
    this.jsonService.getWeaponJSON().pipe(tap(w => this.weapons = w), flatMap(_ =>
      this.jsonService.getJSON('baseFiles/volo_addition')
    )).subscribe(data => {
      // console.log(data);
      // this.apiMonsters = data[0];
      // this.apiMonstersFormatted = this.apiMonsters.map(m => MonsterCreature.fromAPIMonster(m, this.weapons));
      // const names = this.apiMonsters.map(n => n.name);
      this.jsonMonsters = data.sort((a, b) => a.name < b.name ? -1 : 1);


      // console.log(data[2].length, this.jsonMonsters.length);
      // this.jsonMonstersFormatted = data[2].filter(f => names.indexOf(f.name) < 0)
      //   .map((c, i) => c.completed ? new MonsterCreature(c) : MonsterCreature.fromPageDesc(this.jsonMonsters[i], this.weapons));

      // this.jsonMonstersFormatted.map(m => {
      //   m.completed = m.completed ? m.completed : m.actions.map(a => a.name.toLowerCase()).indexOf('multiattack') < 0;
      //   return m;
      // });

      // this.selectedMonsters = this.jsonMonstersFormatted.filter(c => c.completed);
      // console.log(this.weapons);
    });
  }
  public onRowSelect(event) {
    const names = this.selectedMonsters.map(m => m.name);
    this.jsonMonstersFormatted.forEach(m => m.completed = names.indexOf(m.name) >= 0);
    // this.jsonMonsters.forEach(m => m.completed = names.indexOf(m.name) >= 0);
    // console.log(this.selectedMonsters);
  }


  public get data() {
    return this.checked ? [this.jsonMonsters, this.jsonMonstersFormatted] : [this.apiMonsters, this.apiMonstersFormatted];
  }

  public get multiAttackers() {
    return this.jsonMonstersFormatted.filter(f => !f.completed && f.actions.some(s => s.name.toLowerCase() === 'multiattack')).length;
  }

  public get copyVal(): string {
    // return JSON.stringify(this.checked ? this.jsonMonstersFormatted : this.jsonMonsters);
    return JSON.stringify(this.jsonMonsters);
  }

  public copyInputMessage() {
    const val = this.copyVal;
    // console.log(val);
    const s = document.createElement('textarea');
    s.style.position = 'fixed';
    s.style.left = '0';
    s.style.top = '0';
    s.style.opacity = '0';
    s.value = val;
    document.body.appendChild(s);
    s.focus();
    s.select();
    document.execCommand('copy');
    document.body.removeChild(s);
    console.log('Copied');
  }

  public onRowExpand(event, data) {
    // console.log(data);
    // console.log(this.apiMonsters);
    // this.apiMonsters = this.temp;
  }

  public get monLen(): number {
    return this.apiMonsters.length;
  }

  public get monsterNames(): string[] {
    return this.apiMonsters.map(m => m.name);
  }

  public get autoFormattedMonters(): any[] {
    return this.jsonMonsters.map(m => {
      try {
        return this.fromPageDesc(m);
      } catch {
        return m;
      }
    });
    // .filter((m, index) => index >= 99 && index <= 114);
    // return this.monsters.map(m => this.readPageDesc(m))
  }

  public fromPageDesc(m: MonsterMonMan): MonsterCreature {
    return MonsterCreature.fromPageDesc(m);
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

  // public set autoFormattedMonters(monsters: APIMonster[]) {
  //   monsters.forEach(m =>
  //     this.temp[this.monsterNames.indexOf(m.name)] = m
  //   );
  //   console.log(this.monsters);
  // }

  updateMonster(e, i) {
    this.jsonMonstersFormatted[i] = e;
  }
}


