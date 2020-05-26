import { Item } from './equipment.model';

export interface Armor extends Item {
    armorCategory: string;
    armorClass: ArmorClass;
    strMinimum: number;
    stealthDisadvantage: boolean;
}
export interface ArmorClass {
    base: number;
    dexBonus: boolean;
    maxBonus: number | null;
}
