import { Component, OnInit, Input } from '@angular/core';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/rules/ability.enum';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.css']
})
export class StatBlockComponent implements OnInit {
  @Input() Monster: MonsterCreature;
  abilAbbrev: string[] = abilityAbbrev;
  constructor() { }

  ngOnInit() {
    console.log(this.Monster);
  }
}
