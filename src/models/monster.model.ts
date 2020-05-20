import { ConditionImmunity } from './condition.enum';

export interface Monster {
    name: string;
    meta: string;
    Speed: SpeedClass | string;
    Skills?: { [key: string]: number };
    Senses: Senses;
    Languages: string[];
    Challenge: string;
    Traits?: { [key: string]: string }[];
    Actions?: MonsterAction[];
    img_url?: string;
    id?: number;
    Armor_Class: number;
    Armor_Type: string;
    Hit_Points: string;
    Abilities: Abilities;
    Saving_Throws?: Abilities;
    Passive_Perception: number;
    Legendary_Actions?: LegendaryActions;
    Damage_Immunities?: string[];
    Condition_Immunities?: ConditionImmunity[];
    Damage_Resistances?: string[];
    Damage_Vulnerabilities?: string[];
    Reactions?: Reaction[];
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
    ActionsName?: string;
    ActionsDescriptions?: string;
    OtherActions?: string[];
}

export interface LegendaryActions {
    Rules: string;
    Actions: LegendaryActionsAction[];
}

export interface LegendaryActionsAction {
    LegActionsName: string;
    LegActionsDescriptions: string;
    LegActionsPoints: number;
}

export interface Reaction {
    ActionsName: string;
    ActionsDescriptions: string;
}

export interface Senses {
    Darkvision?: number;
    Blindsight?: number;
    Truesight?: number;
    Tremorsense?: number;
}

export interface SpeedClass {
    walking: number;
    hover: boolean;
    swim?: number;
    fly?: number;
    burrow?: number;
    climb?: number;
}
