import { Component, OnInit } from '@angular/core';
import { PythonService } from 'src/app/services/python.service';
import { Die } from '../../dice/dice';
import { Columns } from '../../../../models/column.model';
import { MonsterCreature } from 'src/models/monsters/final-monster/monsterCreature';

export interface Encounter {
  rolled: boolean;
  creatures: EncounterCreature[];
  players: number;
}

export interface EncounterCreature {
  initiativeBonus: number;
  name: string;
  init: number;
}

@Component({
  selector: 'app-init-tracker',
  templateUrl: './init-tracker.component.html',
  styleUrls: ['./init-tracker.component.css']
})

export class InitTrackerComponent implements OnInit {
  constructor(public pythonService: PythonService) { }
  public cols: Columns = [{ field: 'name', header: 'Name' },
  { field: 'initiativeBonus', header: 'Initiative Bonus' },
    // {field: 'init', header: 'Initiative'}
  ];
  public readOnly = false;
  public encounter: Encounter = {
    rolled: false,
    creatures: [
      { initiativeBonus: 1, name: '1', init: null },
      { initiativeBonus: 5, name: '2', init: null },
      { initiativeBonus: 2, name: '3', init: null },
      { initiativeBonus: 3, name: '4', init: null },
      { initiativeBonus: 4, name: '5', init: null },
      { initiativeBonus: 1, name: '6', init: null },
      { initiativeBonus: 3, name: '7', init: null },
      { initiativeBonus: 6, name: '8', init: null }
    ],
    players: 3
  };
  public order = [];

  ngOnInit() {
    console.log(this.encounter.creatures[1].initiativeBonus);
    this.order = this.encounter.creatures;
    // this.rollAll();
  }

  public rollAll(event) {
    if (!this.encounter.rolled) {
      const calls = this.pythonService.rollDice(new Die(20, this.encounter.creatures.length));
      calls.subscribe(s => {
        console.log(s);
        s.rolls.forEach((n, index) => {
          this.encounter.creatures[index].init = n;
          console.log(n);
          console.log(index, this.encounter.creatures[index]);
        });
        this.setOrder();
        this.encounter.rolled = true;
      });
    }
  }

  public setOrder(): void {
    console.log('Order is set');
    const sortedCreatures = this.encounter.creatures.map(s => s);
    console.log(this.order);
    this.order = sortedCreatures.sort((a, b) => initSorter(a, b));
    console.log(this.order);
  }

  public addCombatant(event) {
    console.log(event);
    console.log(this.encounter);
  }

  public get colSpan() {
    return this.encounter.rolled ? 4 : 3;
  }
}
// function initSorter(a: MonsterCreature, b: MonsterCreature): number {
function initSorter(a, b): number {
  let s = 1;
  if (a.init + a.initiativeBonus === b.init + b.initiativeBonus) {
    s = a.initiativeBonus <= b.initiativeBonus ? 1 : -1;
  } else {
    s = a.init + a.initiativeBonus < b.init + b.initiativeBonus ? 1 : -1;
  }
  return s;
}

