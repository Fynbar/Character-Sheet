import { ConditionImmunity } from '../../rules/condition.enum';
import { Page } from '../../spells/spell.model';
import { Die } from 'src/app/components/dice/dice';
import { Dc, Spellcasting, SpecialAbilityUsage, Options, ActionDamage, ActionUsage, Attack } from '../api-monster/apiMonster.model';
import { DamageType } from 'src/models/rules/damage-type';

export interface Monster {
    name: string;
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
    damageImmunities?: DamageType[];
    savingThrows?: Abilities;
    actions: ActionElement[];
    legendary?: LegendaryActionElement[];
    legendaryRules?: string;
    reactions?: ReactionElement[];
    conditionImmunities?: ConditionImmunity[];
    damageResistances?: DamageType[];
    damageVulnerabilities?: DamageType[];
    expertise?: Skills[];
    halfSkills?: Skills[];
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

export interface Legendary {
    rules: string;
    actions: LegendaryAction[];
}

export interface LegendaryAction {
    legActionsName: string;
    legActionsDescriptions: string;
    legActionsPoints: number;
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


export interface Abilities {
    STR?: number | null;
    DEX?: number;
    CON?: number;
    INT?: number;
    WIS?: number;
    CHA?: number;
}

export interface ActionDesc {
    actionText: string[];
    hit?: number | null;
    range?: number | null;
    desc?: Desc | null;
    damage?: string;
    text?: string[];
}

export enum Desc {
    OneCreature = 'one creature',
    OneTarget = 'one target',
    OneTargetInTheSwarmSSpace = 'one target in the swarm\'s space',
}


export interface Legendary {
    rules: string;
    Legendary: LegendaryAction[];
}

export interface LegendaryAction {
    actionsPoints: number;
    actionName: string;
    actionDesc: string[];
}

export interface Meta {
    size: string;
    alignment?: string;
    monsterType: string;
    monsterSubType?: string;
}

export enum Book {
    MonMan = 'mon man',
}

export interface Reaction {
    actionName: string;
    actionText: string[];
}

export interface SavingThrows {
    Dex?: number;
    Con?: number;
    Wis?: number | null;
    Cha?: number | null;
    lnt?: number;
    History?: number;
    Str?: number;
    'Int '?: number;
}

export interface Skills {
    Perception?: number;
    Stealth?: number;
    Arcana?: number;
    Deception?: number;
    Insight?: number;
    Intimidation?: number;
    Survival?: number;
    Religion?: number;
    Persuasion?: number;
    History?: number;
    Athletics?: number;
}

export interface Speed {
    walk: number;
    fly?: number;
    hover: boolean;
    climb?: number;
    burrow?: number;
    swim?: number;
    '60'?: null;
}

interface Action {
    name: string;
    desc: string;
    otherActions?: string[];
    attackBonus?: number;
    damage?: ActionDamage[];
    dc?: Dc;
}

export interface Trait extends Action {
    spellcasting?: Spellcasting;
    usage?: SpecialAbilityUsage;
}

export interface ActionElement extends Action {
    options?: Options;
    usage?: ActionUsage;
    attacks?: Attack[];
    damageDice?: Die;
}

export interface LegendaryActionElement extends Action {
    points: number;
}


export type ReactionElement = Action;
