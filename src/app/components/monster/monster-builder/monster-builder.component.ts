import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { JSONService } from '../../json.service';
import { MonsterCreature } from './monsterCreature';
// import * as data from '../../../../assets/data/mon_man_addition.json';


interface MonsterMonMan {
  see: null | string;
  page: number | null;
  name: string;
  page_desc?: string;
  flavor_text?: string;
}

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
    // { field: 'see', header: 'See' },
  ];
  constructor(
    private jsonService: JSONService
  ) { }
  private monsters: MonsterMonMan[] = [];
  private temp: MonsterMonMan[] = [];


  // ngAfterViewInit() {
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', '<app-dice [diceType]=12></app-dice> two');
  // }

  ngOnInit() {
    // console.log(data);
    this.jsonService.getJSON('mon_man_addition').subscribe(data => {
      this.monsters = data.splice(0, 5);
      console.log(this.monsters);
      // console.log(this.filMon);
    });
  }

  public handleClick(event) {
    this.jsonService.saveJSON('mon_man_addition', this.monsters).subscribe(data => {
      console.log(event);
      console.log('Saved!');
    });
  }

  public copyInputMessage() {
    const val = JSON.stringify(this.monsters);
    // console.log(val);
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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

  public get filMon(): any[] {

    return this.monsters.splice(0, 4);
    // .filter(m => (!m.flavor_text && !m.see))
  }

  // public set filMon(monsters: MonsterMonMan[]) {
  //   monsters.forEach(m =>
  //     this.temp[this.monsterNames.indexOf(m.name)] = m
  //   );
  //   console.log(this.monsters);
  // }

  public fromPageDesc(m: MonsterMonMan) {
    const monster = new MonsterCreature();
    const value: any = { actions: [], traits: [] };
    const pageDesc = m.page_desc ? m.page_desc : '';
    const pageArray = pageDesc.split('\n');
    value.pageArray = pageArray;
    const LowerArray = value.pageArray.map((line: string) => line.toLowerCase());
    const UpperArray = value.pageArray.map((line: string) => line.toUpperCase());
    value.actionIndex = UpperArray.indexOf('ACTIONS');
    value.reactionIndex = UpperArray.indexOf('REACTIONS');
    value.legendaryIndex = UpperArray.indexOf('LEGENDARY ACTIONS');
    value.ChallangeIndex = Math.max(...value.pageArray.map((l, index) => propChecker('Challenge', spaceSplit(l)) ? index : 0));
    // console.log(value.pageArray);
    setMetaData(value);
    const fillerObj: any = {
      actions: 'actionIndex',
      reaction: 'reactionIndex',
      legendary: 'legendaryIndex'
    };
    const idxs = Object.keys(fillerObj).filter(k => value[fillerObj[k]] >= 0)
      .sort((a, b) => value[fillerObj[a]] > value[fillerObj[b]] ? 1 : -1);
    // console.log(idxs, value[fillerObj[idxs[0]]]);
    if (value.ChallangeIndex >= 0) {
      setMonsterProperties(value);
      // Armor Class 19 (natural armor)
    }
    // console.log(pageArray);
    console.log(value.ChallangeIndex + 1, value[fillerObj[idxs[0]]]);
    value.traits = pageArray.slice(value.ChallangeIndex + 1, value[fillerObj[idxs[0]]]);
    idxs.forEach((prop, index) => {
      if (index === idxs.length - 1) {
        value[prop] = pageArray.slice(value[fillerObj[prop]] + 1);
      } else {
        value[prop] = pageArray.slice(value[fillerObj[prop]] + 1, value[fillerObj[idxs[index + 1]]]);
      }
    });

    // filter((s, i) => value.ChallangeIndex >= i && i <= value[fillerObj[idxs[0]]]);
    // if ()

    return value;
  }


}
function setMetaData(value: any) {
  if (value.pageArray[0].length > 0) {
    const tempMeta = value.pageArray[0].split(', ');
    const tempMetaFist = spaceSplit(tempMeta[0]);
    value.meta = {
      size: tempMetaFist[0], monster_type: spaceJoin(tempMetaFist.slice(1)), alignment: tempMeta[1]
    };
  }
}

function setMonsterProperties(value: any) {
  const pageArray = value.pageArray;
  pageArray.forEach((line: string, index: number) => {
    const lineSS = spaceSplit(line);
    // console.log(lineSS, value.pageArray);
    if (propChecker('Armor Class', lineSS)) {
      let AC = lineSS.splice(2);
      AC = stripArray(AC);
      // console.log(AC);
      value.armorClass = AC[0];
      const armorType = spaceJoin(AC.splice(1));
      // console.log(armorType);
      value.armorType = armorType.substring(1, armorType.length - 1);
    } else if (propChecker('Hit Points', lineSS)) {
      let HP = spaceJoin(lineSS.splice(3));
      HP = HP.substring(1, HP.length - 2);
      let d: number[];
      let c: number;
      // console.log(HP);
      if (HP.indexOf('+') > 0 || HP.indexOf('-') > 0) {
        const HPs = spaceSplit(HP);
        d = HPs[0].split('d').map(e => Number(e));
        c = HPs[1] === '+' ? Number(HPs[2]) : -1 * (Number(HPs[2]));
      } else {
        d = HP.split('d').map(e => Number(e));
        c = 0;
      }
      value.hitPoints = { constant: c, dice_type: d[1], dice_num: d[0] };
    } else if (propChecker('Speed', lineSS)) {
      // console.log();
      const speeds = spaceJoin(lineSS.splice(1)).split(', ').map(s => spaceSplit(s));
      // console.log(speeds);
      const speedObj: any = { walking: Number(speeds[0][0].replace('ft.', '')) };
      speeds.splice(1).forEach(s => speedObj[s[0]] = Number(s[1].replace('ft.', '')));
      value.Speed = speedObj;
    } else if (propChecker('Skills', lineSS)) {
      const skills = spaceJoin(lineSS.splice(1)).replace(/\s/g, '').split(',');
      const skillObj: any = {};
      skills.forEach(s => {
        let plusMinusIndex;
        let skillValue;
        if (s.indexOf('-') > 0) {
          plusMinusIndex = s.indexOf('-');
          skillValue = -1 * Number(s.substring(plusMinusIndex, s.length));
        } else {
          plusMinusIndex = s.indexOf('+');
          skillValue = Number(s.substring(plusMinusIndex, s.length));
        }
        skillObj[s.substring(0, plusMinusIndex)] = skillValue;
      });
      value.skills = skillObj;
      // .map(s => spaceSplit(s));
    } else if (propChecker('Senses', lineSS)) {
      const senses = spaceJoin(lineSS.splice(1)).replace('ft.', '').split(', ');
      const senseObj: any = {};
      const y = spaceSplit(senses.splice(-1)[0]).map(s => s.toLowerCase());
      value.passivePerception = Number(y[y.indexOf('perception') + 1]);
      // console.log(senses.map(s => spaceSplit(s))); // .splice(0, senses.length - 1));
      senses.map(s => spaceSplit(s)).forEach(s => {
        // console.log(s[s.length - 1], );
        senseObj[spaceJoin(s.splice(0, s.length - 1))] = Number(s[s.length - 1].replace('ft.', ''));
      });
      value.senses = senseObj;
    } else if (abilityAbbrev.indexOf(lineSS[0]) >= 0) {
      const abilitiesObj: any = {};
      abilityAbbrev.forEach(aa => abilitiesObj[aa] = Number(lineSS[lineSS.indexOf(aa) + 1]));
      value.Abilities = abilitiesObj;
    } else if (propChecker('Languages', lineSS)) {
      value.Languages = spaceJoin(lineSS.splice(1)).split(', ');
    } else if (propChecker('Challenge', lineSS)) {
      const str = spaceJoin(lineSS.splice(1));
      value.Challenge = str.substring(0, str.indexOf(' ('));
    } else if (propChecker('Damage Resistances', lineSS)) {
      value.damageResistances = spaceJoin(lineSS.splice(2)).split(', ');
    } else if (propChecker('Damage Immunities', lineSS)) {
      value.damageImmunities = spaceJoin(lineSS.splice(2)).split(', ');
    } else if (propChecker('Condition Immunities', lineSS)) {
      value.conditionImmunities = spaceJoin(lineSS.splice(2)).split(', ');
    } else if (propChecker('Saving Throws', lineSS)) {
      const st = spaceJoin(lineSS.splice(2)).split(', ');
      const abilitiesObj: any = {};
      st.forEach(s => {
        s = s.replace(' ', '');
        const isMinus = s.indexOf('-');
        const i = isMinus >= 0 ? isMinus : s.indexOf('+');
        abilitiesObj[s.substring(0, i)] = isMinus >= 0 ? -1 * Number(s.substring(i + 1)) : Number(s.substring(i + 1));
      });
      value.savingThrow = abilitiesObj;
    } else if (index > 0 && index <= value.ChallangeIndex) {
      console.log(spaceJoin(lineSS.splice(0, 2)));
    }
  });
}

function stripArray(stringArray: string[]): string[] {
  const emptyArray = ['', ' '];
  // console.log(stringArray[stringArray.length - 1], stringArray[stringArray.length - 1] === '\s');
  if (emptyArray.indexOf(stringArray[0]) >= 0 || stringArray[0].length === 0) {
    stringArray = stringArray.splice(1);
    // } else if (emptyArray.indexOf(stringArray[stringArray.length - 1]) >= 0) {
    //   stringArray = stringArray.splice(-1);
  } else {
    return stringArray;
  }
  return stripArray(stringArray);
}

function propChecker(str: string, lineSS: string[]): boolean {
  // const ssStr = spaceSplit(str);
  // const mapStr = ssStr.map((word, i) => {
  //   console.log(word, lineSS[i], word === lineSS[i]);
  //   return word === lineSS[i];
  // });
  return spaceSplit(str).every((word, i) => word === lineSS[i]);
  // mapStr.every((word, i) => word === lineSS[i]);
}

function spaceJoin(strs: string[]): string {
  return strs.join(' ');
}

function spaceSplit(str: string): string[] {
  return str.split(' ');
}

const abilityAbbrev = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
