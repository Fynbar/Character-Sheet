import { Component, OnInit } from '@angular/core';
import { flatMap, tap, map } from 'rxjs/operators';
import { Weapon } from 'src/models/equipment/weapon.model';
import { MonsterMonMan } from 'src/models/monsters/mon-man-text-monster/monsterMonMan';
import { APIMonster } from '../../../../models/monsters/api-monster/apiMonster.model';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { abilityAbbrev } from '../../../../models/rules/ability.enum';
import { insertString, sortFunction } from '../../../common/string.functions';
import { JSONService } from '../../../services/json.service';
import { forkJoin } from 'rxjs';


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
  expandedRows = {};
  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    // console.log(generateFieldHTML(this.cols));
    this.jsonService.getWeaponJSON().pipe(tap(w => this.weapons = w), flatMap(_ =>
      forkJoin(this.jsonService.getJSON('baseFiles/volo_addition')
        , this.jsonService.getJSON('voloMonsterAdditions')
      )
    )
      // , map(d => d[0])
    ).subscribe(data => {
      console.log(data);
      // this.apiMonsters = data[0];
      // this.apiMonstersFormatted = this.apiMonsters.map(m => MonsterCreature.fromAPIMonster(m, this.weapons));

      const names = data[1]
        // .filter(j => !(179 < j.page.page && j.page.page < 201))
        .map(n => n.name);

      this.jsonMonsters = data[0]
        // .map(s => {
        // s.completed = false;
        //   s.completed = s.flavor_text ? true : false;
        //   return s;
        // })
        // .sort((a, b) => a.completed || b.completed && !(a.completed && b.completed) ?
        //  a.completed ? -1 : 1 : sortFunction(a.page, b.page))
        ;
      // console.log(this.jsonMonsters);


      // console.log(data[2].length, this.jsonMonsters.length);
      this.jsonMonstersFormatted = this.jsonMonsters
        .filter(f => names.indexOf(f.name) < 0)
        .map(j =>
          //  179 < j.page && j.page < 201 ? MonsterCreature.fromPageDesc(this.formatPageDesc(j), this.weapons) :
          MonsterCreature.fromPageDesc(j, this.weapons));
      // this.formatPageDesc(
      // const test: any = MonsterCreature.fromPageDesc(data[0]), this.weapons);
      // test.defineActions();
      // console.log(this.jsonMonsters, this.jsonMonstersFormatted);

      this.jsonMonstersFormatted.map(m => {
        m.defineActions();
        // console.log(this.jsonMonstersFormatted);
        m.completed = m.completed ? m.completed :
          m.actions.map(a => a.name.toLowerCase()).indexOf('multiattack') < 0 && m.name.toLowerCase().indexOf('variant') < 0;
        return m;
      }).sort((a, b) => (a.completed || b.completed && !(a.completed && b.completed)) ?
        (a.completed ? 1 : -1) : sortFunction(a.page.book, b.page.book));

      this.selectedMonsters =
        data[1].concat(
          this.jsonMonstersFormatted.filter(c => c.completed)
        )
        ;

      // this.selectedMonsters = this.jsonMonsters.filter(c => c.completed);
      // console.log(this.jsonMonsters, this.jsonMonstersFormatted);
    });
  }
  public onRowSelect(event) {
    const names = this.selectedMonsters.map(m => m.name);
    this.jsonMonstersFormatted.forEach(m => m.completed = names.indexOf(m.name) >= 0);
    // this.jsonMonsters.forEach(m => m.completed = names.indexOf(m.name) >= 0);
    // console.log(this.selectedMonsters);
  }


  public get data() {
    return !this.checked ? this.jsonMonsters : this.jsonMonstersFormatted;
  }

  public get multiAttackers() {
    return this.jsonMonstersFormatted.filter(f => !f.completed && f.actions.some(s => s.name.toLowerCase() === 'multiattack')).length;
  }

  public get copyVal(): string {
    return JSON.stringify(this.checked ?
      this.selectedMonsters.filter(f => f.meta ? true : false) : this.jsonMonsters);
    // return JSON.stringify(this.jsonMonsters);
    // return JSON.stringify(this.data.sort((a, b) => sortFunction(a.name, b.name)));
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

  public onButtonClick(m) {
    m = this.formatPageDesc(m);
  }

  public get monLen(): number {
    return this.apiMonsters.length;
  }

  public get monsterNames(): string[] {
    return this.apiMonsters.map(m => m.name);
  }

  // public get autoFormattedMonters(): any[] {
  //   return this.jsonMonsters.map(m => {
  //     try {
  //       return this.fromPageDesc(
  //         //   this.formatPageDesc(
  //           m
  //           // )
  //         );
  //     } catch {
  //       return m;
  //     }
  //   });
  //   // .filter((m, index) => index >= 99 && index <= 114);
  //   // return this.monsters.map(m => this.readPageDesc(m))
  // }

  public fromPageDesc(m: MonsterMonMan): MonsterCreature {
    return MonsterCreature.fromPageDesc(m);
  }

  public formatPageDesc(str: MonsterMonMan): MonsterMonMan {
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
    findIndecies = findIndecies.filter(n => s.indexOf(n) >= 0).sort((a, b) => s.indexOf(a) > s.indexOf(b) ? 1 : -1);
    indecies = findIndecies.map(find =>
      s.indexOf(find)
    );
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

  get allExpanded(): boolean {
    return this.jsonMonstersFormatted.every(e => this.expandedRows[e.name] ? true : false);
  }

  public expandAllRows() {
    if (!this.allExpanded) {
      this.jsonMonstersFormatted.forEach(e => this.expandedRows[e.name] = true);
    } else {
      this.expandedRows = {};
    }
  }
}




