import { ConditionImmunity } from './condition.enum';
import { Page } from './spell.model';
import { Dice } from 'src/app/components/dice/dice';

export interface Monster {
    name: string;
    meta: {
        size: string;
        monsterType: string;
        alignment: string;
    };
    speed: string | SpeedClass;
    skills?: {
        [key: string]: number;
    };
    senses: Senses;
    languages: string[];
    challenge: string;
    traits?: {
        [key: string]: string;
    }[];
    actions?: MonsterAction[];
    imgurl?: string;
    id?: number;
    armorClass: number;
    armorType: string;
    hitPoints: Dice;
    abilities: Abilities;
    savingThrows?: Abilities;
    passivePerception: number;
    legendaryActions?: LegendaryActions;
    damageImmunities?: string[];
    conditionImmunities?: ConditionImmunity[];
    damageResistances?: string[];
    damageVulnerabilities?: string[];
    reactions?: Reaction[];
    page?: Page;
}

export interface Abilities {
    STR?: number;
    DEX?: number;
    CON?: number;
    INT?: number;
    WIS?: number;
    CHA?: number;
}

export interface MonsterAction {
    actionsName?: string;
    actionsDescriptions?: string;
    otherActions?: string[];
}

export interface LegendaryActions {
    rules: string;
    actions: LegendaryActionsAction[];
}

export interface LegendaryActionsAction {
    legActionsName: string;
    legActionsDescriptions: string;
    legActionsPoints: number;
}

export interface Reaction {
    actionsName: string;
    actionsDescriptions: string;
}

export interface Senses {
    darkvision?: number;
    blindsight?: number;
    truesight?: number;
    tremorsense?: number;
}

export interface SpeedClass {
    walking: number;
    hover: boolean;
    swim?: number;
    fly?: number;
    burrow?: number;
    climb?: number;
}
