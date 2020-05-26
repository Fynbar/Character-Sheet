import { Component, OnInit } from '@angular/core';
import { Monster, ActionElement, Abilities } from '../../../../models/monsters/final-monster/monster.model';
import { Dice } from '../../dice/dice';
import { Attack, ActionUsage, Options, Dc, ActionDamage } from 'src/models/monsters/api-monster/apiMonster.model';
import { Weapon, WeaponRange, CategoryRange } from 'src/models/equipment/weapon.model';
import { MonsterCreature } from 'src/models/monsters/final-monster/monsterCreature';
import { DamageStatusType } from 'src/models/rules/damageStatusType';


export class WeaponAttack implements ActionElement {
  /* "actions": [{
            "name": "Scimitar",
            "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) slashing damage.",
            "attack_bonus": 3,
            "damage": [{
                "damage_type": {
                    "name": "Slashing",
                    "url": "/api/damage-types/slashing"
                },
                "damage_dice": "1d6",
                "damage_bonus": 1
            }]
        }], */
  name: string;
  desc: string;
  weapon: Weapon;
  attackBonus?: number;
  damage?: ActionDamage[] = [];
  // options?: Options;
  // usage?: ActionUsage;
  // attacks?: Attack[];
  // damageDice?: Dice;
  modifers: Abilities;
  proficiency: number;
  /* creature: Monster */
  constructor(weapon: Weapon, abilitiesModifiers: Abilities, proficiency: number, desc?) {
    // console.log(monster);
    this.desc = desc;
    this.weapon = weapon;
    this.modifers = abilitiesModifiers;
    this.proficiency = proficiency;
    let rollBonus: number;
    if (weapon.weaponRange === WeaponRange.Ranged) {
      rollBonus = this.modifers.DEX;
    } else if (weapon.properties.indexOf({ name: 'finesse' }) >= 0) {
      rollBonus = Math.max(this.modifers.DEX, this.modifers.STR);
    } else {
      rollBonus = this.modifers.STR;
    }
    this.name = weapon.name;
    this.attackBonus = this.proficiency + rollBonus;
    const damageBonus = this.attackBonus + weapon.damage.damageBonus;
    this.damage = [{
      damageType: weapon.damage.damageType,
      damageDice: Dice.fromString(`${weapon.damage.damageDice}${damageBonus >= 0 ? ' + ' : ' '}${damageBonus}`)
    }];
    // if (damageBonus < 0) {
    //   console.log(this.damage[0].damageDice.makeString, weapon.damage.damageDice, damageBonus);
    // }
    // console.log(this);
    // `${monster.name}, ${weapon.name}`);
  }

  get attackRangeString() {
    let s = 'Weapon Attack';
    s = `${this.weapon.weaponRange}${this.weapon.throwRange && this.weapon.weaponRange === WeaponRange.Melee ? ' or Ranged' : ''} ${s}`;
    return s;
  }

  get damageHitString(): string[] {
    return this.damage.map(dam => `Hit: ${dam.damageDice.makeString} ${this.weapon.damage.damageType.toLowerCase()} damage.`);
  }

  get rangeString(): string {
    let s: string;
    if (this.weapon.weaponRange) {
      if (this.weapon.weaponRange === WeaponRange.Melee) {
        s = `reach ${this.weapon.range.normal} ft.${this.weapon.range.long ? `/${this.weapon.range.long}ft.` : ''}`;
      } else {
        s = `range ${this.weapon.range.normal} ft.${this.weapon.range.long ? `/${this.weapon.range.long}ft.` : ''}`;
      }
      if (this.weapon.throwRange) {
        s = `${s} or range ${this.weapon.throwRange.normal} ft.${this.weapon.throwRange.long ? `/${this.weapon.throwRange.long}ft.` : ''}`;
      }
      return `${s},`;
    } else {
      return '';
    }
  }

  get hitString(): string {
    if (this.attackBonus !== 0) {
      return `${this.attackBonus >= 0 ? '+' : '-'}${this.attackBonus} to hit,`;
    } else {
      return '';
    }
  }

  public get stringVersion(): string {
    return `${this.attackRangeString}: ${this.hitString} ${this.rangeString} one target. ${this.damageHitString[0]}`;
  }
}
