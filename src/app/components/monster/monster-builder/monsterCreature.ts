import { Monster, Reaction, LegendaryActions, MonsterAction, Abilities, Senses, SpeedClass } from 'src/models/monster.model';
import { ConditionImmunity } from 'src/models/condition.enum';

export class MonsterCreature implements Monster {
    // tslint:disable:variable-name
    name: string;
    meta: string;
    Speed: string | SpeedClass;
    Skills?: {
        [key: string]: number;
    };
    Senses: Senses;
    Languages: string[];
    Challenge: string;
    Traits?: {
        [key: string]: string;
    }[];
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

    constructor() { }

    public fromPageDesc(monMan) {
        return monMan.page_desc.split('\n');
    }
}
