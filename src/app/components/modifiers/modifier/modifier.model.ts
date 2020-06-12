import { Component, OnInit } from '@angular/core';
import {
  Abilities,
  ActionElement,
  LegendaryActionElement,
  Meta,
  Monster,
  ReactionElement,
  Senses,
  Skills,
  Speed,
  Trait
} from '../../../../models/monsters/final-monster/monster.model';
import { ConditionImmunity } from '../../../../models/rules/condition.enum';
import { DamageType } from '../../../../models/rules/damage-type';
// import { Senses } from '../../../../models/monsters/api-monster/apiMonster.model';
import { Page } from '../../../../models/spells/spell.model';
import { Die } from '../../dice/dice';
// import { Meta } from '@angular/platform-browser';
import { JSONService } from '../../../services/json.service';
import { MonsterCreature } from 'src/models/monsters/final-monster/monsterCreature';

enum ModType {
  add = 'add',
  subtract = 'subtract',
  base = 'base',
  create = 'create',
  remove = 'remove',
  factor = 'factor'
}

type ModValue = number | string | ConditionImmunity | DamageType | ActionElement | ReactionElement | LegendaryActionElement | Trait;

export class ModifiedMonster implements Monster {
  // public modifiedProperty: string;
  public modifications: CreatureModifier[];
  public modifiedCreature: MonsterCreature;
  name: string;
  meta?: Meta;
  page: Page;
  speed?: Speed;
  skills?: Skills;
  senses?: Senses;
  languages?: string[];
  challenge: string;
  traits: Trait[];
  armorClass?: number;
  hitPoints?: Die;
  abilities: Abilities;
  passivePerception?: number;
  flavorText: string;
  armorType?: string;
  damageImmunities?: string[];
  savingThrows?: Abilities;
  legendary?: LegendaryActionElement[];
  legendaryRules?: string;
  conditionImmunities?: ConditionImmunity[];
  damageResistances?: string[];
  reactions?: ReactionElement[];
  damageVulnerabilities?: string[];
  constructor(private monster: MonsterCreature) {
    this.modifiedCreature = monster;
  }
  public static FromMonster(monster: Monster) {
    return new ModifiedMonster(new MonsterCreature(monster));
  }
}


export interface CreatureModifier {
  modifiedProperty: string;
  modificationType: ModType;
  modifiedValue: ModValue;
}
