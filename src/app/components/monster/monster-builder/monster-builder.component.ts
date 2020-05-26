import { Component, OnInit } from '@angular/core';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/rules/ability.enum';
import { APIMonster, Convert } from '../../../../models/monsters/api-monster/apiMonster.model';
import { JSONService } from '../../../services/json.service';
import { insertString } from '../../../common/string.functions';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { map } from 'rxjs/operators';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { MonsterMonMan } from 'src/models/monsters/mon-man-text-monster/monsterMonMan';
import { forkJoin } from 'rxjs';
import { Weapon } from 'src/models/equipment/weapon.model';
import { generateFieldHTML } from '../../equipment/Column';

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
  public monsters: APIMonster[] = [];
  public txtmonsters: MonsterCreature[] = [];
  public filMon: MonsterCreature[] = [];
  private temp: APIMonster[] = [];
  public mon2: any[] = [];
  public weapons: Weapon[] = [];
  selectedMonsters = [];
  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    console.log(generateFieldHTML(this.cols));
    forkJoin(this.jsonService.getJSON('apiMons'), this.jsonService.getJSON('mon_man_addition'), this.jsonService.getWeaponJSON())
      .subscribe(data => {
        console.log(data);
        this.monsters = data[0];
        this.filMon = this.monsters.map(m => MonsterCreature.fromAPIMonster(m, data[2]));
        const names = this.monsters.map(n => n.name);
        this.mon2 = data[1].filter(f => names.indexOf(f.name) < 0);
        // console.log(data[1].filter(f => names.indexOf(f.name) > 0));
        this.txtmonsters = this.mon2.map(m => MonsterCreature.fromPageDesc(m, data[2]));
        this.weapons = data[2];
        this.selectedMonsters = this.txtmonsters.filter((_, index) => this.mon2[index].completed && this.txtmonsters[index].completed);
        // console.log(this.weapons);
      });
  }
  public onRowSelect(event) {
    const names = this.selectedMonsters.map(m => m.name);
    this.txtmonsters.forEach(m => m.completed = names.indexOf(m.name) >= 0);
    this.mon2.forEach(m => m.completed = names.indexOf(m.name) >= 0);
    console.log(this.selectedMonsters);
  }


  public get data() {
    return this.checked ? [this.mon2, this.txtmonsters] : [this.monsters, this.filMon];
  }

  public get multiAttackers() {
    return this.txtmonsters.filter(f => f.actions.some(s => s.name.toLowerCase() === 'multiattack')).length;
  }

  public get copyVal(): string {
    return JSON.stringify(this.checked ? this.txtmonsters : this.mon2);
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
    console.log(this.monsters);
    this.monsters = this.temp;
  }

  public get monLen(): number {
    return this.monsters.length;
  }

  public get monsterNames(): string[] {
    return this.monsters.map(m => m.name);
  }

  // public get filMon(): any[] {
  //   return this.monsters.map(m => MonsterCreature.fromAPIMonster(m));
  //     // .filter((m, index) => index >= 99 && index <= 114);
  //     // return this.monsters.map(m => this.readPageDesc(m))
  // }

  // public fromPageDesc(m: MonsterMonMan): MonsterCreature {
  //   return MonsterCreature.fromPageDesc(m);
  // }

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

  // public set filMon(monsters: APIMonster[]) {
  //   monsters.forEach(m =>
  //     this.temp[this.monsterNames.indexOf(m.name)] = m
  //   );
  //   console.log(this.monsters);
  // }

}


