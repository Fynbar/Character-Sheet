import { Component, OnInit } from '@angular/core';
import { ConditionImmunity } from 'src/models/rules/condition.enum';
import { DamageType } from 'src/models/rules/damage-type';
import { ActionElement, ReactionElement, LegendaryActionElement, Trait } from 'src/models/monsters/final-monster/monster.model';

enum ModType {
  add = 'add',
  subtract = 'subtract',
  base = 'base',
  create = 'create',
  remove = 'remove',
  factor = 'factor'
}

type ModValue = number | string | ConditionImmunity | DamageType | ActionElement | ReactionElement | LegendaryActionElement | Trait;

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  public modifiedProperty: string;
  public modificationType: ModType;
  public modifiedValue: ModValue;
    constructor() { }

ngOnInit() {
}

}
