import { Component, OnInit, Input } from '@angular/core';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/rules/ability.enum';
import { ActionElement, LegendaryActionElement } from '../../../../models/monsters/final-monster/monster.model';
import { FluffyType, RESTType, PurpleType, Trait } from 'src/models/monsters/api-monster/apiMonster.model';

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

  toRechargeString(action: ActionElement | Trait) {
    let s;
    let r = '';
    if (action.usage) {
      if (action.usage.type === PurpleType.RechargeAfterREST) {
        s = [
          action.usage.restTypes.indexOf(RESTType.Long) >= 0 ? 'Long' : '',
          action.usage.restTypes.length > 1 ? 'or' : '',
          action.usage.restTypes.indexOf(RESTType.Short) >= 0 ? 'Short' : ''
        ].filter(f => f.length > 0);
        r = ` (Recharge after ${s.join(' ')} Rest)`;
      } else if (action.usage.type === PurpleType.RechargeOnRoll) {
        s = action.usage.dice.diceType !== action.usage.minValue ? `${action.usage.minValue}-` : '';
        r = ` (Recharge ${s}${action.usage.dice.diceType})`;
      } else if (action.usage.type === PurpleType.PerDay) {
        r = ` (${action.usage.times}/day)`;
      }
    }
    return r;
  }

  toLegendaryPointString(action: LegendaryActionElement) {
    return action.points > 1 ? ` (Costs ${action.points} Actions)` : '';
  }
}
