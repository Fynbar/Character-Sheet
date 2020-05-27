import { Component, OnInit } from '@angular/core';
import { Monster, ActionElement, Abilities } from '../../../../models/monsters/final-monster/monster.model';
import { Dice } from '../../dice/dice';
import { Attack, ActionUsage, Options, Dc, ActionDamage } from '../../../../models/monsters/api-monster/apiMonster.model';
import { Weapon, WeaponRange, CategoryRange } from '../../../../models/equipment/weapon.model';
import { MonsterCreature } from '../../../../models/monsters/final-monster/monsterCreature';
import { DamageType } from '../../../../models/rules/damage-type';
import { Action } from 'rxjs/internal/scheduler/Action';


export class WeaponAttack implements ActionElement {
  name: string;
  desc: string;
  weapon: Weapon;
  attackBonus?: number;
  damage?: ActionDamage[] = [];
  modifers: Abilities;
  proficiency: number;
  // isTwoHanded = false;
  constructor(weapon: Weapon, abilitiesModifiers: Abilities, proficiency: number, action?: ActionElement) {
    this.damage = action.damage.map((ad: ActionDamage) => {
      if (ad.damage_dice) {
        const dice = ad.damage_dice.split('d').map(n => Number(n));
        ad.damageDice = new Dice(dice[1], dice[0], ad.damage_bonus);
        delete ad.damage_dice; delete ad.damage_bonus;
      }
      if (ad.damage_type) {
        // const dice = d.damage_ice.split('d').map(n => Number(n));
        ad.damageType = ad.damage_type.name;
        delete ad.damage_type;
      }
      return ad;
    });
    // console.log(weapon.name, desc);
    this.desc = action.desc;
    // this.damage = action.damage;

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
    let d: ActionDamage = {
      damageType: DamageType[weapon.damage.damageType],
      damageDice: Dice.fromString(`${weapon.damage.damageDice}${damageBonus >= 0 ? ' + ' : ' '}${damageBonus}`)
    };
    if (weapon.the2HDamage) {
      // this.isTwoHanded = true;
      d = {
        choose: 1,
        type: 'damage',
        from: [d,
          {
            damageType: weapon.the2HDamage.damageType,
            damageDice: Dice.fromString(`${weapon.the2HDamage.damageDice}${damageBonus >= 0 ? ' + ' : ' '}${damageBonus}`)
          }]
      };
    }

    this.damage[0] = d;


    // if (this.desc.indexOf('plus') >= 0) {
    //   console.log(weapon.name, this.desc, this.stringVersion);
    // }
  }

  get isTwoHanded(): boolean {
    return this.weapon.the2HDamage ? true : false;
  }

  get additionalEffect(): boolean {
    return this.damage.length > 1;
  }

  get attackRangeString() {
    let s = 'Weapon Attack';
    s = `${this.weapon.weaponRange}${this.weapon.throwRange && this.weapon.weaponRange === WeaponRange.Melee ? ' or Ranged' : ''} ${s}`;
    return s;
  }

  get damageHitString(): string {
    const damage = ['', ''];
    let dam = this.damage[0];
    if (this.isTwoHanded) {
      dam = this.damage[0].from[0];
      const thd = this.damage[0].from[1];
      damage[1] = `, or ${thd.damageDice.makeString} ${thd.damageType.toLowerCase()} damage if used with two hands ${this.weapon.throwRange
        ? 'to make a melee attack' : ''}`;
      // `, or 8 (1d10 + 3) slashing damage if used with two hands`
      // `, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack`
    }
    if (this.additionalEffect) {
      damage.concat(...this.damage.slice(1).map(d => `, plus ${d.damageDice.makeString} ${d.damageType.toLowerCase()} damage`));
    }
    damage[0] = `Hit: ${dam.damageDice.makeString} ${this.weapon.damage.damageType.toLowerCase()} damage`;

    return `${damage.join('')}.`;
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
    return `${this.attackRangeString}: ${this.hitString} ${this.rangeString} one target. ${this.damageHitString}`;
  }
}
