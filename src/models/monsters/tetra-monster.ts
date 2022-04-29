export interface TetraMonster {
    name: string;
    size: string;
    type: string;
    tag: string;
    alignment: string;
    hitDice: string;
    armorName: string;
    shieldBonus: number;
    natArmorBonus: number;
    otherArmorDesc: string;
    speed: string;
    burrowSpeed: string;
    climbSpeed: string;
    flySpeed: string;
    hover: boolean;
    swimSpeed: string;
    customHP: boolean;
    customSpeed: boolean;
    hpText: string;
    speedDesc: string;
    strPoints: string;
    dexPoints: string;
    conPoints: string;
    intPoints: string;
    wisPoints: string;
    chaPoints: string;
    blindsight: string;
    blind: boolean;
    darkvision: string;
    tremorsense: string;
    truesight: string;
    telepathy: number;
    cr: string;
    customCr: string;
    customProf: number;
    isLegendary: boolean;
    legendariesDescription: string;
    isLair: boolean;
    lairDescription: string;
    lairDescriptionEnd: string;
    isRegional: boolean;
    regionalDescription: string;
    regionalDescriptionEnd: string;
    properties: any[];
    abilities: Ability[];
    actions: Ability[];
    reactions: Ability[];
    legendaries: Ability[];
    lairs: Ability[];
    regionals: Ability[];
    sthrows: Sthrow[];
    skills: Skill[];
    damagetypes: Damagetype[];
    specialdamage: Damagetype[];
    conditions: Condition[];
    languages: Language[];
    understandsBut: string;
    shortName: string;
    doubleColumns: boolean;
    separationPoint: number;
    damage: any[];
    pluralName?: string;
}

export interface Ability {
    name: string;
    desc: string;
}

export interface Condition {
    name: string;
}

export interface Damagetype {
    name: string;
    note: Note;
    type: Type;
}

export enum Note {
    Immune = ' (Immune)',
    Resistant = ' (Resistant)',
    Vulnerable = ' (Vulnerable)',
}

export enum Type {
    I = 'i',
    R = 'r',
    V = 'v',
}

export interface Language {
    name: string;
    speaks: boolean;
}

export interface Skill {
    name: string;
    stat: Stat;
    note?: string;
}

export enum Stat {
    Cha = 'cha',
    Con = 'con',
    Dex = 'dex',
    Int = 'int',
    Str = 'str',
    Wis = 'wis',
}

export interface Sthrow {
    name: Stat;
    order: number;
}
