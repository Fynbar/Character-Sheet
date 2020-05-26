import { Item, Cost } from './equipment.model';
export interface AdventuringGear extends Item {
    gearCategory: GearCategory;
    cost: Cost;
    desc?: string[];
    contents?: Content[];
}
export interface Content {
    itemURL: string;
    quantity: number;
}
export enum GearCategory {
    Ammunition = 'Ammunition',
    ArcaneFocus = 'Arcane focus',
    DruidicFocus = 'Druidic focus',
    EquipmentPack = 'Equipment Pack',
    HolySymbol = 'Holy Symbol',
    Kit = 'Kit',
    StandardGear = 'Standard Gear'
}
