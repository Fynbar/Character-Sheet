import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/rules/ability.enum';
import { ActionElement, LegendaryActionElement } from '../../../../models/monsters/final-monster/monster.model';
import { FluffyType, Trait } from 'src/models/monsters/api-monster/apiMonster.model';
import { toRechargeString } from './to-recharge-string';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.css']
})
export class StatBlockComponent implements OnInit {
  @Input() Monster: MonsterCreature;
  @Output() updatedCreature: EventEmitter<MonsterCreature> = new EventEmitter();
  abilAbbrev: string[] = abilityAbbrev;
  readOnly = true;
  constructor() { }

  ngOnInit() {
    console.log(this.Monster);
    this.readOnly = this.Monster.completed;
  }

  public toRechargeString(action: ActionElement | Trait) {
    return toRechargeString(action);
  }

  public toLegendaryPointString(action: LegendaryActionElement) {
    return action.points > 1 ? ` (Costs ${action.points} Actions)` : '';
  }

  updateAction(e, i) {
    console.log(e);
    this.Monster.actions[i] = e;
    this.outputMonster();
  }


  private outputMonster() {
    this.updatedCreature.emit(this.Monster);
  }

  get actionNames() {
    return this.Monster.actions.map(a => a.name).filter(name => name !== 'Multiattack');
  }
}


