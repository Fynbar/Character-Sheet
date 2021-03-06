import { Dc, Spellcasting, SpecialAbilityUsage, Options, ActionDamage, ActionUsage, Attack } from './apiMonster.model';

interface Action {
    name: string;
    desc: string;
    attack_bonus?: number;
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
    damage_dice?: string;
}

export interface LegendaryActionElement extends Action {
    points: number;
}


export type ReactionElement = Action;
