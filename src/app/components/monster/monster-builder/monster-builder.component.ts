import { Component, OnInit } from '@angular/core';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/rules/ability.enum';
import { APIMonster, Convert } from '../../../../models/monsters/api-monster/apiMonster.model';
import { JSONService } from '../../../services/json.service';
import { insertString } from '../../../common/string.functions';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { map } from 'rxjs/operators';
import { DndApiService } from 'src/app/services/dnd-api.service';
import { MonsterMonMan } from 'src/models/monsters/mon-man-text-monster/monsterMonMan';

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
    { field: 'page', header: 'Page' },
    { field: 'see', header: 'See' },
  ];
  constructor(
    private jsonService: JSONService
  ) { }
  public monsters: APIMonster[] = [];
  public txtmonsters: MonsterCreature[] = [];
  public filMon: MonsterCreature[] = [];
  private temp: APIMonster[] = [];


  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    this.jsonService.getJSON('mon_man_addition').subscribe(data => this.txtmonsters = data.map(m => this.fromPageDesc(m)));
    // console.log(data);
    this.jsonService.getJSON('apiMons').subscribe(data => {
      this.monsters = data;
      this.filMon = this.monsters.map(m => MonsterCreature.fromAPIMonster(m));
    });

  }

  // public handleClick(event) {
  //   this.jsonService.saveJSON('mon_man_addition', this.monsters).subscribe(data => {
  //     console.log(event);
  //     console.log('Saved!');
  //   });
  // }

  public get copyVal(): string {
    return JSON.stringify(this.txtmonsters);
    // return JSON.stringify(this.monsters);
    // return JSON.stringify(this.filMon);
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

  public fromPageDesc(m: MonsterMonMan): MonsterCreature {
    return MonsterCreature.fromPageDesc(m);
  }

  // public readPageDesc(str: APIMonster): APIMonster {
  //   let s = str.page_desc ? str.page_desc : '';
  // tslint:disable-next-line:max-line-length
  //   let findIndecies = ['Speed', 'Languages', 'Damage Immunities', 'Condition Immunities', 'Damage Resistances', 'Senses', 'Skills', 'Challenge', 'Hit Points', 'Armor Class', 'Damage Vulnerabilities', 'Saving Throws', 'Damage Resistance'].concat(abilityAbbrev);
  //   let indecies = findIndecies.map(find =>
  //     s.indexOf(find)
  //   ).filter(n => n >= 0).sort((a, b) => a > b ? 1 : -1);
  //   let newLine = '\n';
  //   indecies.forEach((found, index) => s = insertString(s, newLine, found + index));
  //   str.page_desc = s;
  //   // console.log(str);
  //   findIndecies = ['ACTIONS', 'REACTIONS', 'LEGENDARY ACTIONS'];
  //   indecies = findIndecies.map(find =>
  //     s.indexOf(find)
  //   ).filter(n => n >= 0).sort((a, b) => a > b ? 1 : -1);

  //   newLine = '\n';
  //   indecies.forEach((found, index) => {
  //     s = insertString(s, newLine, found + index);
  //     s = insertString(s, newLine, found + findIndecies[index].length + 2 * (index + 1));
  //   });
  //   str.page_desc = s;
  //   return str;
  // }
  // public set filMon(monsters: APIMonster[]) {
  //   monsters.forEach(m =>
  //     this.temp[this.monsterNames.indexOf(m.name)] = m
  //   );
  //   console.log(this.monsters);
  // }

}


