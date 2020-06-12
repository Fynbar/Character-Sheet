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
  factor = 'factor',
  // set = 'set',
}

type ModValue = number | string | ConditionImmunity | DamageType | ActionElement | ReactionElement | LegendaryActionElement | Trait;

export class ModifiedMonster implements Monster {
  // public modifiedProperty: string;
  public modifications: CreatureModifier[];
  public modifiedCreature: MonsterCreature;
  // name: string;
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
  outputMonster?: MonsterCreature;
  constructor(private monster: MonsterCreature) {
    this.modifiedCreature = monster;
    this.modifications = [];

  }
  public static FromMonster(monster: Monster) {
    let s;
    s = new MonsterCreature(monster);
    console.log(Object.keys(s));
    return new ModifiedMonster(s);
    // return new ModifiedMonster(new MonsterCreature(monster));
  }

  private addModification(
    modProp: string,
    modType: ModType,
    modVal: ModValue,
  ) {
    this.modifications.push({
      modifiedProperty: modProp,
      modificationType: modType,
      modifiedValue: modVal
    });
    this.outputMonster = this.solve();
  }

  public get name() {
    return this.modifiedCreature.name;
  }
  public set name(str) {
    // this.addModification('name', ModType.remove, str);
    this.addModification('name', ModType.base, str);
  }

  public solve() {
    let properties = this.modifications.map(m => m.modifiedProperty);
    properties = properties.filter((f, i) => properties.indexOf(f) <= i);
    const modObj: { [key: string]: CreatureModifier[] } = {};
    properties.forEach(property => modObj[property] = this.modifications.filter(m => m.modifiedProperty === property));
    console.log(modObj);
    let modifiedCreature = this.modifiedCreature;
    this.modifications.forEach(mod => modifiedCreature = this.applyModification(modifiedCreature, mod));
    return modifiedCreature;
  }

  public applyModification(modifiedCreature: MonsterCreature, modification: CreatureModifier) {
    switch (modification.modificationType) {
      case ModType.add:
        modifiedCreature[modification.modifiedProperty] = modifiedCreature[modification.modifiedProperty] + modification.modifiedValue;
        break;
      case ModType.subtract:
        modifiedCreature[modification.modifiedProperty] =
          modifiedCreature[modification.modifiedProperty] - Number(modification.modifiedValue);
        break;
      case ModType.factor:
        modifiedCreature[modification.modifiedProperty] =
          modifiedCreature[modification.modifiedProperty] * Number(modification.modifiedValue);
        break;
      case ModType.create:
        modifiedCreature[modification.modifiedProperty].push(modification.modifiedValue);
        break;
      case ModType.remove:
        modifiedCreature[modification.modifiedProperty]
          .splice(modifiedCreature[modification.modifiedProperty].indexOf(modification.modifiedValue), 1);
        break;
      case ModType.base:
        modifiedCreature[modification.modifiedProperty] = modification.modifiedValue;
        break;
      default:
        console.log(`Idk what to do with ${modification.modificationType}`);
        break;
    }
    return modifiedCreature;
  }
}


export interface CreatureModifier {
  modifiedProperty: string;
  modificationType: ModType;
  modifiedValue: ModValue;
}
