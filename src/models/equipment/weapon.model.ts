import { Item } from './equipment.model';
import { DamageStatusType } from '../rules/damageStatusType';

export interface Weapon extends Item {
    weaponCategory: WeaponCategory;
    weaponRange: WeaponRange;
    categoryRange: CategoryRange;
    damage: Damage;
    range: Range;
    properties: WeaponProperty[];
    the2HDamage?: Damage;
    throwRange?: Range;
    special?: string[];
}
export enum CategoryRange {
    MartialMelee = 'Martial Melee',
    MartialRanged = 'Martial Ranged',
    SimpleMelee = 'Simple Melee',
    SimpleRanged = 'Simple Ranged'
}
export interface Damage {
    damageDice: string;
    damageBonus: number;
    damageType: DamageStatusType;
}
export interface WeaponProperty {
    // url: string;
    name: string;
}

export interface Range {
    normal: number;
    long: number | null;
}
export enum WeaponCategory {
    Martial = 'Martial',
    Simple = 'Simple'
}
export enum WeaponRange {
    Melee = 'Melee',
    Ranged = 'Ranged'
}
