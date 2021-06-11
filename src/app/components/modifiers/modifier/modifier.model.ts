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
import { ConditionImmunity, Condition } from '../../../../models/rules/condition.enum';
import { DamageType, lowerDamageType } from '../../../../models/rules/damage-type';
import { Page } from '../../../../models/spells/spell.model';
import { Die } from '../../dice/dice';
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
  public modifications: CreatureModifier[];
  public modifiedCreature: MonsterCreature;
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
  savingThrows?: Abilities;
  actions: ActionElement[];
  legendary?: LegendaryActionElement[];
  legendaryRules?: string;
  reactions?: ReactionElement[];
  expertise?: Skills[];
  halfSkills?: Skills[];

  outputMonster?: MonsterCreature;
  constructor(monster: MonsterCreature) {
    this.modifiedCreature = monster;
    this.modifications = [];
  }

  public static FromMonster(monster: Monster) {
    const s = new MonsterCreature(monster);
    // console.log(Object.keys(s));
    return new ModifiedMonster(s);
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
    this.solve();
  }

  public get name() {
    return this.modifiedCreature.name;
  }
  public set name(str) {
    this.addModification('name', ModType.base, str);
  }

  public get conditionImmunities(): ConditionImmunity[] {
    return this.modifiedCreature.conditionImmunities ? this.modifiedCreature.conditionImmunities : null;
  }
  public set conditionImmunities(strs: ConditionImmunity[]) {
    this.modifiedCreature.conditionImmunities.filter(f => strs.indexOf(f) < 0)
      .forEach((str: ConditionImmunity) => this.addModification('name', ModType.remove, Condition[str]));
    strs.filter(f => this.modifiedCreature.conditionImmunities.indexOf(f) < 0)
      .forEach((str: ConditionImmunity) => this.addModification('name', ModType.add, Condition[str]));
  }

  public get damageImmunities(): DamageType[] {
    return this.modifiedCreature.damageImmunities ? this.modifiedCreature.damageImmunities : null;
  }
  public set damageImmunities(strs: DamageType[]) {
    this.modifiedCreature.damageImmunities.filter(f => strs.indexOf(f) < 0)
      .forEach((str: DamageType) => this.addModification('name', ModType.remove, lowerDamageType[str]));
    strs.filter(f => this.modifiedCreature.damageImmunities.indexOf(f) < 0)
      .forEach((str: DamageType) => this.addModification('name', ModType.add, lowerDamageType[str]));
  }

  public get damageResistances(): DamageType[] {
    return this.modifiedCreature.damageResistances ? this.modifiedCreature.damageResistances : null;
  }
  public set damageResistances(strs: DamageType[]) {
    this.modifiedCreature.damageResistances.filter(f => strs.indexOf(f) < 0)
      .forEach((str: DamageType) => this.addModification('name', ModType.remove, lowerDamageType[str]));
    strs.filter(f => this.modifiedCreature.damageResistances.indexOf(f) < 0)
      .forEach((str: DamageType) => this.addModification('name', ModType.add, lowerDamageType[str]));
  }

  public get damageVulnerabilities(): DamageType[] {
    return this.modifiedCreature.damageVulnerabilities ? this.modifiedCreature.damageVulnerabilities : null;
  }
  public set damageVulnerabilities(strs: DamageType[]) {
    this.modifiedCreature.damageVulnerabilities.filter(f => strs.indexOf(f) < 0)
      .forEach((str: DamageType) => this.addModification('name', ModType.remove, lowerDamageType[str]));
    strs.filter(f => this.modifiedCreature.damageVulnerabilities.indexOf(f) < 0)
      .forEach((str: DamageType) => this.addModification('name', ModType.add, lowerDamageType[str]));
  }


  public solve() {
    let properties = this.modifications.map(m => m.modifiedProperty);
    properties = properties.filter((f, i) => properties.indexOf(f) <= i);
    const modObj: { [key: string]: CreatureModifier[] } = {};
    properties.forEach(property =>
      modObj[property] = this.modificationCondenser(this.modifications.filter(m => m.modifiedProperty === property)));
    // modObj = );
    let modifiedCreature = this.modifiedCreature;
    this.modifications.forEach(mod => modifiedCreature = this.applyModification(modifiedCreature, mod));
    this.outputMonster = modifiedCreature;
  }

  private modificationCondenser(properties: CreatureModifier[]) {
    console.log(properties);
    return properties;
  }

  public applyModification(modifiedCreature: MonsterCreature, modification: CreatureModifier) {
    switch (modification.modificationType) {
      case ModType.add:
        if (modification.modifiedValue instanceof Array) {
          modifiedCreature[modification.modifiedProperty].push(modification.modifiedValue);
        } else {
          modifiedCreature[modification.modifiedProperty] = modifiedCreature[modification.modifiedProperty] + modification.modifiedValue;
        }
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
