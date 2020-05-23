import { Component, OnInit, Input } from '@angular/core';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/rules/ability.enum';

@Component({
  selector: 'app-monster-viewer',
  templateUrl: './monster-viewer.component.html',
  styleUrls: ['./monster-viewer.component.css']
})
export class MonsterViewerComponent implements OnInit {
  @Input() Monster: MonsterCreature;
  abilAbbrev: string[] = abilityAbbrev;
  constructor() { }

  ngOnInit() {
    console.log(this.Monster);
  }
}
