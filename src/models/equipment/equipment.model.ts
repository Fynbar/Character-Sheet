import { AdventuringGear } from './adventuring-gear.model';
import { Armor } from './armor.model';
import { Tools } from './tools.model';
import { MountsAndVehicle } from './mount-vehicle.model';
import { Weapon } from './weapon.model';

export interface EquipmentObject {
    adventuringGear: AdventuringGear[];
    tools: Tools[];
    mountsAndVehicles: MountsAndVehicle[];
    weapon: Weapon[];
    armor: Armor[];
}

export interface Item {
    name: string;
    equipmentCategory: EquipmentCategory; // string;
    cost: Cost;
    weight?: number;
}

export interface Cost {
    quantity: number;
    unit: monetaryUnit;
}

export enum monetaryUnit {
    Cp = 'cp',
    Gp = 'gp',
    SP = 'sp',
}

export enum EquipmentCategory {
    AdventuringGear = 'Adventuring Gear',
    Tools = 'Tools',
    Armor = 'Armor',
    MountsAndVehicles = 'Mounts and Vehicles',
    Weapon = 'Weapon',
}


