// tslint:disable:no-shadowed-variable
// tslint:disable:curly
// tslint:disable:object-literal-key-quotes
// To parse this data:
//
//   import { Convert } from './file';
//
//   const aPIMonster = Convert.toAPIMonster(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { abilityAbbreviations, Condition } from '../../../models/rules/condition.enum';
import { DamageStatusType } from '../../rules/damageStatusType';
import { Dice } from '../../../app/components/dice/dice';

export interface APIMonster {
    _id: string;
    index: string;
    name: string;
    size: Size;
    type: APIMonsterType;
    subtype: null | string;
    alignment: Alignment;
    armor_class: number;
    hit_points: number;
    hit_dice: string;
    speed: APIMonsterSpeed;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    proficiencies: Proficiency[];
    damage_vulnerabilities: string[];
    damage_resistances: string[];
    damage_immunities: string[];
    condition_immunities: ConditionImmunity[];
    senses: Senses;
    languages: string;
    challenge_rating: number;
    special_abilities?: Trait[];
    actions?: ActionElement[];
    legendary_actions?: LegendaryActionElement[];
    url: string;
    reactions?: ReactionElement[];
    other_speeds?: OtherSpeed[];
}

export interface Attack {
    name: string;
    dc: Dc;
    damage?: FromElement[];
}

export interface FromElement {
    damage_type: DamageStatusType;
    damage_dice: string;
    damage_bonus: number;
}

export interface ConditionImmunity {
    name: Condition;
    url: string;
}


export interface Dc {
    dc_type?: {
        name: abilityAbbreviations;
        url: string;
    };
    dc_value?: number;
    success_type?: SuccessType;
    dcType?: abilityAbbreviations;
    dcValue?: number;
    successType?: SuccessType;
}

export enum SuccessType {
    Hafl = 'hafl',
    Half = 'half',
    Nhalfone = 'nhalfone',
    None = 'none',
}

export interface ActionDamage {
    damage_type?: {
        name: DamageStatusType;
        url: string;
    };
    damage_dice?: string;
    damage_bonus?: number;
    damageType?: DamageStatusType;
    damageDice?: Dice;
    dc?: Dc;
    choose?: number;
    type?: DamageType;
    from?: FromElement[];
}

export enum DamageType {
    Damage = 'damage',
}

export interface Options {
    choose: number;
    from: Array<From[]>;
}

export interface From {
    name: string;
    count: number | string;
    type: FromType;
    note?: string;
}

export enum FromType {
    Ability = 'ability',
    Magic = 'magic',
    Melee = 'melee',
    Ranged = 'ranged',
}

export interface ActionUsage {
    type: PurpleType;
    times?: number;
    dice?: Dice;
    min_value?: number;
    rest_types?: RESTType[];
    minValue?: number;
    restTypes?: RESTType[];
}

export interface Trait extends Action {
    spellcasting?: Spellcasting;
    usage?: ActionUsage;
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


interface Action {
    name: string;
    desc: string;
    attack_bonus?: number;
    damage?: ActionDamage[];
    dc?: Dc;
}

export type ReactionElement = Action;

// export enum Dice {
//     The1D6 = '1d6',
// }

export enum RESTType {
    Long = 'long',
    Short = 'short',
}

export enum PurpleType {
    PerDay = 'per day',
    RechargeAfterREST = 'recharge after rest',
    RechargeOnRoll = 'recharge on roll',
}

export enum Alignment {
    AnyAlignment = 'any alignment',
    AnyChaoticAlignment = 'any chaotic alignment',
    AnyEvilAlignment = 'any evil alignment',
    AnyNonGoodAlignment = 'any non-good alignment',
    AnyNonLawfulAlignment = 'any non-lawful alignment',
    ChaoticEvil = 'chaotic evil',
    ChaoticGood = 'chaotic good',
    ChaoticNeutral = 'chaotic neutral',
    LawfulEvil = 'lawful evil',
    LawfulGood = 'lawful good',
    LawfulNeutral = 'lawful neutral',
    Neutral = 'neutral',
    NeutralEvil = 'neutral evil',
    NeutralGood = 'neutral good',
    NeutralGood50OrNeutralEvil50 = 'neutral good (50%) or neutral evil (50%)',
    Unaligned = 'unaligned',
}



export interface OtherSpeed {
    form: string;
    speed: OtherSpeedSpeed;
}

export interface OtherSpeedSpeed {
    walk: Darkvision;
    climb?: Blindsight;
}

export enum Blindsight {
    The10Ft = '10 ft.',
    The120Ft = '120 ft.',
    The30Ft = '30 ft.',
    The30FtBlindBeyondThisRadius = '30 ft. (blind beyond this radius)',
    The30FtOr10FtWhileDeafenedBlindBeyondThisRadius = '30 ft. or 10 ft. while deafened (blind beyond this radius)',
    The60Ft = '60 ft.',
    The60FtBlindBeyondThisRadius = '60 ft. (blind beyond this radius)',
}

export enum Darkvision {
    The120Ft = '120 ft.',
    The150Ft = '150 ft.',
    The30Ft = '30 ft.',
    The40Ft = '40 ft.',
    The50Ft = '50 ft.',
    The60Ft = '60 ft.',
    The60FtRatFormOnly = '60 ft. (rat form only)',
    The80Ft = '80 ft.',
    The90Ft = '90 ft.',
}

export interface Proficiency {
    name: ProficiencyName;
    url: URL;
    value: number;
}

export enum ProficiencyName {
    SavingThrowCHA = 'Saving Throw: CHA',
    SavingThrowCON = 'Saving Throw: CON',
    SavingThrowDEX = 'Saving Throw: DEX',
    SavingThrowINT = 'Saving Throw: INT',
    SavingThrowSTR = 'Saving Throw: STR',
    SavingThrowWIS = 'Saving Throw: WIS',
    SkillAcrobatics = 'Skill: Acrobatics',
    SkillArcana = 'Skill: Arcana',
    SkillAthletics = 'Skill: Athletics',
    SkillDeception = 'Skill: Deception',
    SkillHistory = 'Skill: History',
    SkillInsight = 'Skill: Insight',
    SkillIntimidation = 'Skill: Intimidation',
    SkillInvestigation = 'Skill: Investigation',
    SkillMedicine = 'Skill: Medicine',
    SkillNature = 'Skill: Nature',
    SkillPerception = 'Skill: Perception',
    SkillPerformance = 'Skill: Performance',
    SkillPersuasion = 'Skill: Persuasion',
    SkillReligion = 'Skill: Religion',
    SkillStealth = 'Skill: Stealth',
    SkillSurvival = 'Skill: Survival',
}

export enum URL {
    APIProficienciesSavingThrowCha = '/api/proficiencies/saving-throw-cha',
    APIProficienciesSavingThrowCon = '/api/proficiencies/saving-throw-con',
    APIProficienciesSavingThrowDex = '/api/proficiencies/saving-throw-dex',
    APIProficienciesSavingThrowInt = '/api/proficiencies/saving-throw-int',
    APIProficienciesSavingThrowStr = '/api/proficiencies/saving-throw-str',
    APIProficienciesSavingThrowWis = '/api/proficiencies/saving-throw-wis',
    APIProficienciesSkillAcrobatics = '/api/proficiencies/skill-acrobatics',
    APIProficienciesSkillArcana = '/api/proficiencies/skill-arcana',
    APIProficienciesSkillAthletics = '/api/proficiencies/skill-athletics',
    APIProficienciesSkillDeception = '/api/proficiencies/skill-deception',
    APIProficienciesSkillHistory = '/api/proficiencies/skill-history',
    APIProficienciesSkillInsight = '/api/proficiencies/skill-insight',
    APIProficienciesSkillIntimidation = '/api/proficiencies/skill-intimidation',
    APIProficienciesSkillInvestigation = '/api/proficiencies/skill-investigation',
    APIProficienciesSkillMedicine = '/api/proficiencies/skill-medicine',
    APIProficienciesSkillNature = '/api/proficiencies/skill-nature',
    APIProficienciesSkillPerception = '/api/proficiencies/skill-perception',
    APIProficienciesSkillPerformance = '/api/proficiencies/skill-performance',
    APIProficienciesSkillPersuasion = '/api/proficiencies/skill-persuasion',
    APIProficienciesSkillReligion = '/api/proficiencies/skill-religion',
    APIProficienciesSkillStealth = '/api/proficiencies/skill-stealth',
    APIProficienciesSkillSurvival = '/api/proficiencies/skill-survival',
}

export interface Senses {
    darkvision?: Darkvision;
    passive_perception: number;
    blindsight?: Blindsight;
    truesight?: Blindsight;
    tremorsense?: Blindsight;
}

export enum Size {
    Gargantuan = 'Gargantuan',
    Huge = 'Huge',
    Large = 'Large',
    Medium = 'Medium',
    Small = 'Small',
    Tiny = 'Tiny',
}

export interface Spellcasting {
    level?: number;
    ability: ConditionImmunity;
    dc?: number;
    modifier?: number;
    components_required: ComponentsRequired[];
    school?: School;
    slots?: { [key: string]: number };
    spells: Spell[];
}

export enum ComponentsRequired {
    M = 'M',
    S = 'S',
    V = 'V',
}

export enum betterComponentsRequired {
    material = 'M',
    somatic = 'S',
    vocal = 'V',
}

export enum School {
    Cleric = 'cleric',
    Druid = 'druid',
    Wizard = 'wizard',
}

export interface Spell {
    name: string;
    level?: number;
    url: string;
    usage?: SpellUsage;
    note?: string;
    notes?: string;
}

export interface SpellUsage {
    type: FluffyType;
    times?: number;
}

export enum FluffyType {
    AtWill = 'at will',
    PerDay = 'per day',
}

export interface SpecialAbilityUsage {
    type: PurpleType;
    times?: number;
    rest_types?: RESTType[];
}

export interface APIMonsterSpeed {
    walk?: Burrow;
    swim?: Burrow;
    fly?: Darkvision;
    burrow?: Burrow;
    climb?: Burrow;
    hover?: boolean;
}

export enum Burrow {
    The0Ft = '0 ft.',
    The10Ft = '10 ft.',
    The15Ft = '15 ft.',
    The20Ft = '20 ft.',
    The25Ft = '25 ft.',
    The30Ft = '30 ft.',
    The40Ft = '40 ft.',
    The50Ft = '50 ft.',
    The5Ft = '5 ft.',
    The60Ft = '60 ft.',
    The90Ft = '90 ft.',
}

export enum APIMonsterType {
    Aberration = 'aberration',
    Beast = 'beast',
    Celestial = 'celestial',
    Construct = 'construct',
    Dragon = 'dragon',
    Elemental = 'elemental',
    Fey = 'fey',
    Fiend = 'fiend',
    Giant = 'giant',
    Humanoid = 'humanoid',
    Monstrosity = 'monstrosity',
    Ooze = 'ooze',
    Plant = 'plant',
    SwarmOfTinyBeasts = 'swarm of Tiny beasts',
    Undead = 'undead',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAPIMonster(json: string): APIMonster[] {
        return cast(JSON.parse(json), a(r('APIMonster')));
    }

    public static aPIMonsterToJson(value: APIMonster[]): string {
        return JSON.stringify(uncast(value, a(r('APIMonster'))), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue('array', val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue('Date', val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== 'object' || Array.isArray(val)) {
            return invalidValue('object', val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === 'any') return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === 'object' && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === 'object') {
        return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== 'number') return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    'APIMonster': o([
        { json: '_id', js: '_id', typ: '' },
        { json: 'index', js: 'index', typ: '' },
        { json: 'name', js: 'name', typ: '' },
        { json: 'size', js: 'size', typ: r('Size') },
        { json: 'type', js: 'type', typ: r('APIMonsterType') },
        { json: 'subtype', js: 'subtype', typ: u(null, '') },
        { json: 'alignment', js: 'alignment', typ: r('Alignment') },
        { json: 'armor_class', js: 'armor_class', typ: 0 },
        { json: 'hit_points', js: 'hit_points', typ: 0 },
        { json: 'hit_dice', js: 'hit_dice', typ: '' },
        { json: 'speed', js: 'speed', typ: r('APIMonsterSpeed') },
        { json: 'strength', js: 'strength', typ: 0 },
        { json: 'dexterity', js: 'dexterity', typ: 0 },
        { json: 'constitution', js: 'constitution', typ: 0 },
        { json: 'intelligence', js: 'intelligence', typ: 0 },
        { json: 'wisdom', js: 'wisdom', typ: 0 },
        { json: 'charisma', js: 'charisma', typ: 0 },
        { json: 'proficiencies', js: 'proficiencies', typ: a(r('Proficiency')) },
        { json: 'damage_vulnerabilities', js: 'damage_vulnerabilities', typ: a('') },
        { json: 'damage_resistances', js: 'damage_resistances', typ: a('') },
        { json: 'damage_immunities', js: 'damage_immunities', typ: a('') },
        { json: 'condition_immunities', js: 'condition_immunities', typ: a(r('ConditionImmunity')) },
        { json: 'senses', js: 'senses', typ: r('Senses') },
        { json: 'languages', js: 'languages', typ: '' },
        { json: 'challenge_rating', js: 'challenge_rating', typ: 3.14 },
        { json: 'special_abilities', js: 'special_abilities', typ: u(undefined, a(r('SpecialAbility'))) },
        { json: 'actions', js: 'actions', typ: u(undefined, a(r('ActionElement'))) },
        { json: 'legendary_actions', js: 'legendary_actions', typ: u(undefined, a(r('LegendaryActionElement'))) },
        { json: 'url', js: 'url', typ: '' },
        { json: 'reactions', js: 'reactions', typ: u(undefined, a(r('LegendaryActionElement'))) },
        { json: 'other_speeds', js: 'other_speeds', typ: u(undefined, a(r('OtherSpeed'))) },
    ], false),
    'ActionElement': o([
        { json: 'name', js: 'name', typ: '' },
        { json: 'desc', js: 'desc', typ: '' },
        { json: 'options', js: 'options', typ: u(undefined, r('Options')) },
        { json: 'attack_bonus', js: 'attack_bonus', typ: u(undefined, 0) },
        { json: 'dc', js: 'dc', typ: u(undefined, r('Dc')) },
        { json: 'damage', js: 'damage', typ: u(undefined, a(r('ActionDamage'))) },
        { json: 'usage', js: 'usage', typ: u(undefined, r('ActionUsage')) },
        { json: 'attacks', js: 'attacks', typ: u(undefined, a(r('Attack'))) },
        { json: 'damage_dice', js: 'damage_dice', typ: u(undefined, '') },
    ], false),
    'Attack': o([
        { json: 'name', js: 'name', typ: '' },
        { json: 'dc', js: 'dc', typ: r('Dc') },
        { json: 'damage', js: 'damage', typ: u(undefined, a(r('FromElement'))) },
    ], false),
    'FromElement': o([
        { json: 'damage_type', js: 'damage_type', typ: r('ConditionImmunity') },
        { json: 'damage_dice', js: 'damage_dice', typ: '' },
        { json: 'damage_bonus', js: 'damage_bonus', typ: 0 },
    ], false),
    'ConditionImmunity': o([
        { json: 'name', js: 'name', typ: r('ConditionImmunityName') },
        { json: 'url', js: 'url', typ: '' },
    ], false),
    'Dc': o([
        { json: 'dc_type', js: 'dc_type', typ: r('ConditionImmunity') },
        { json: 'dc_value', js: 'dc_value', typ: 0 },
        { json: 'success_type', js: 'success_type', typ: r('SuccessType') },
    ], false),
    'ActionDamage': o([
        { json: 'damage_type', js: 'damage_type', typ: u(undefined, r('ConditionImmunity')) },
        { json: 'damage_dice', js: 'damage_dice', typ: u(undefined, '') },
        { json: 'damage_bonus', js: 'damage_bonus', typ: u(undefined, 0) },
        { json: 'dc', js: 'dc', typ: u(undefined, r('Dc')) },
        { json: 'choose', js: 'choose', typ: u(undefined, 0) },
        { json: 'type', js: 'type', typ: u(undefined, r('DamageType')) },
        { json: 'from', js: 'from', typ: u(undefined, a(r('FromElement'))) },
    ], false),
    'Options': o([
        { json: 'choose', js: 'choose', typ: 0 },
        { json: 'from', js: 'from', typ: a(a(r('From'))) },
    ], false),
    'From': o([
        { json: 'name', js: 'name', typ: '' },
        { json: 'count', js: 'count', typ: u(0, '') },
        { json: 'type', js: 'type', typ: r('FromType') },
        { json: 'note', js: 'note', typ: u(undefined, '') },
    ], false),
    'ActionUsage': o([
        { json: 'type', js: 'type', typ: r('PurpleType') },
        { json: 'times', js: 'times', typ: u(undefined, 0) },
        { json: 'dice', js: 'dice', typ: u(undefined, r('Dice')) },
        { json: 'min_value', js: 'min_value', typ: u(undefined, 0) },
        { json: 'rest_types', js: 'rest_types', typ: u(undefined, a(r('RESTType'))) },
    ], false),
    'LegendaryActionElement': o([
        { json: 'name', js: 'name', typ: '' },
        { json: 'desc', js: 'desc', typ: '' },
        { json: 'attack_bonus', js: 'attack_bonus', typ: u(undefined, 0) },
        { json: 'damage', js: 'damage', typ: u(undefined, a(r('FromElement'))) },
        { json: 'dc', js: 'dc', typ: u(undefined, r('Dc')) },
    ], false),
    'OtherSpeed': o([
        { json: 'form', js: 'form', typ: '' },
        { json: 'speed', js: 'speed', typ: r('OtherSpeedSpeed') },
    ], false),
    'OtherSpeedSpeed': o([
        { json: 'walk', js: 'walk', typ: r('Darkvision') },
        { json: 'climb', js: 'climb', typ: u(undefined, r('Blindsight')) },
    ], false),
    'Proficiency': o([
        { json: 'name', js: 'name', typ: r('ProficiencyName') },
        { json: 'url', js: 'url', typ: r('URL') },
        { json: 'value', js: 'value', typ: 0 },
    ], false),
    'Senses': o([
        { json: 'darkvision', js: 'darkvision', typ: u(undefined, r('Darkvision')) },
        { json: 'passive_perception', js: 'passive_perception', typ: 0 },
        { json: 'blindsight', js: 'blindsight', typ: u(undefined, r('Blindsight')) },
        { json: 'truesight', js: 'truesight', typ: u(undefined, r('Blindsight')) },
        { json: 'tremorsense', js: 'tremorsense', typ: u(undefined, r('Blindsight')) },
    ], false),
    'SpecialAbility': o([
        { json: 'name', js: 'name', typ: '' },
        { json: 'desc', js: 'desc', typ: '' },
        { json: 'dc', js: 'dc', typ: u(undefined, r('Dc')) },
        { json: 'spellcasting', js: 'spellcasting', typ: u(undefined, r('Spellcasting')) },
        { json: 'usage', js: 'usage', typ: u(undefined, r('SpecialAbilityUsage')) },
        { json: 'damage', js: 'damage', typ: u(undefined, a(r('FromElement'))) },
        { json: 'attack_bonus', js: 'attack_bonus', typ: u(undefined, 0) },
    ], false),
    'Spellcasting': o([
        { json: 'level', js: 'level', typ: u(undefined, 0) },
        { json: 'ability', js: 'ability', typ: r('ConditionImmunity') },
        { json: 'dc', js: 'dc', typ: u(undefined, 0) },
        { json: 'modifier', js: 'modifier', typ: u(undefined, 0) },
        { json: 'components_required', js: 'components_required', typ: a(r('ComponentsRequired')) },
        { json: 'school', js: 'school', typ: u(undefined, r('School')) },
        { json: 'slots', js: 'slots', typ: u(undefined, m(0)) },
        { json: 'spells', js: 'spells', typ: a(r('Spell')) },
    ], false),
    'Spell': o([
        { json: 'name', js: 'name', typ: '' },
        { json: 'level', js: 'level', typ: u(undefined, 0) },
        { json: 'url', js: 'url', typ: '' },
        { json: 'usage', js: 'usage', typ: u(undefined, r('SpellUsage')) },
        { json: 'note', js: 'note', typ: u(undefined, '') },
        { json: 'notes', js: 'notes', typ: u(undefined, '') },
    ], false),
    'SpellUsage': o([
        { json: 'type', js: 'type', typ: r('FluffyType') },
        { json: 'times', js: 'times', typ: u(undefined, 0) },
    ], false),
    'SpecialAbilityUsage': o([
        { json: 'type', js: 'type', typ: r('PurpleType') },
        { json: 'times', js: 'times', typ: u(undefined, 0) },
        { json: 'rest_types', js: 'rest_types', typ: u(undefined, a(r('RESTType'))) },
    ], false),
    'APIMonsterSpeed': o([
        { json: 'walk', js: 'walk', typ: u(undefined, r('Burrow')) },
        { json: 'swim', js: 'swim', typ: u(undefined, r('Burrow')) },
        { json: 'fly', js: 'fly', typ: u(undefined, r('Darkvision')) },
        { json: 'burrow', js: 'burrow', typ: u(undefined, r('Burrow')) },
        { json: 'climb', js: 'climb', typ: u(undefined, r('Burrow')) },
        { json: 'hover', js: 'hover', typ: u(undefined, true) },
    ], false),
    'ConditionImmunityName': [
        'Acid',
        'Blinded',
        'Bludgeoning',
        'CHA',
        'Charmed',
        'Cold',
        'CON',
        'Deafened',
        'DEX',
        'Exhaustion',
        'Fire',
        'Frightened',
        'Grappled',
        'INT',
        'Lightning',
        'Necrotic',
        'Paralyzed',
        'Petrified',
        'Piercing',
        'Poison',
        'Poisoned',
        'Prone',
        'Psychic',
        'Radiant',
        'Restrained',
        'Slashing',
        'STR',
        'Stunned',
        'Thunder',
        'Unconscious',
        'WIS',
    ],
    'SuccessType': [
        'hafl',
        'half',
        'nhalfone',
        'none',
    ],
    'DamageType': [
        'damage',
    ],
    'FromType': [
        'ability',
        'magic',
        'melee',
        'ranged',
    ],
    'Dice': [
        '1d6',
    ],
    'RESTType': [
        'long',
        'short',
    ],
    'PurpleType': [
        'per day',
        'recharge after rest',
        'recharge on roll',
    ],
    'Alignment': [
        'any alignment',
        'any chaotic alignment',
        'any evil alignment',
        'any non-good alignment',
        'any non-lawful alignment',
        'chaotic evil',
        'chaotic good',
        'chaotic neutral',
        'lawful evil',
        'lawful good',
        'lawful neutral',
        'neutral',
        'neutral evil',
        'neutral good',
        'neutral good (50%) or neutral evil (50%)',
        'unaligned',
    ],
    'Blindsight': [
        '10 ft.',
        '120 ft.',
        '30 ft.',
        '30 ft. (blind beyond this radius)',
        '30 ft. or 10 ft. while deafened (blind beyond this radius)',
        '60 ft.',
        '60 ft. (blind beyond this radius)',
    ],
    'Darkvision': [
        '120 ft.',
        '150 ft.',
        '30 ft.',
        '40 ft.',
        '50 ft.',
        '60 ft.',
        '60 ft. (rat form only)',
        '80 ft.',
        '90 ft.',
    ],
    'ProficiencyName': [
        'Saving Throw: CHA',
        'Saving Throw: CON',
        'Saving Throw: DEX',
        'Saving Throw: INT',
        'Saving Throw: STR',
        'Saving Throw: WIS',
        'Skill: Acrobatics',
        'Skill: Arcana',
        'Skill: Athletics',
        'Skill: Deception',
        'Skill: History',
        'Skill: Insight',
        'Skill: Intimidation',
        'Skill: Investigation',
        'Skill: Medicine',
        'Skill: Nature',
        'Skill: Perception',
        'Skill: Performance',
        'Skill: Persuasion',
        'Skill: Religion',
        'Skill: Stealth',
        'Skill: Survival',
    ],
    'URL': [
        '/api/proficiencies/saving-throw-cha',
        '/api/proficiencies/saving-throw-con',
        '/api/proficiencies/saving-throw-dex',
        '/api/proficiencies/saving-throw-int',
        '/api/proficiencies/saving-throw-str',
        '/api/proficiencies/saving-throw-wis',
        '/api/proficiencies/skill-acrobatics',
        '/api/proficiencies/skill-arcana',
        '/api/proficiencies/skill-athletics',
        '/api/proficiencies/skill-deception',
        '/api/proficiencies/skill-history',
        '/api/proficiencies/skill-insight',
        '/api/proficiencies/skill-intimidation',
        '/api/proficiencies/skill-investigation',
        '/api/proficiencies/skill-medicine',
        '/api/proficiencies/skill-nature',
        '/api/proficiencies/skill-perception',
        '/api/proficiencies/skill-performance',
        '/api/proficiencies/skill-persuasion',
        '/api/proficiencies/skill-religion',
        '/api/proficiencies/skill-stealth',
        '/api/proficiencies/skill-survival',
    ],
    'Size': [
        'Gargantuan',
        'Huge',
        'Large',
        'Medium',
        'Small',
        'Tiny',
    ],
    'ComponentsRequired': [
        'M',
        'S',
        'V',
    ],
    'School': [
        'cleric',
        'druid',
        'wizard',
    ],
    'FluffyType': [
        'at will',
        'per day',
    ],
    'Burrow': [
        '0 ft.',
        '10 ft.',
        '15 ft.',
        '20 ft.',
        '25 ft.',
        '30 ft.',
        '40 ft.',
        '50 ft.',
        '5 ft.',
        '60 ft.',
        '90 ft.',
    ],
    'APIMonsterType': [
        'aberration',
        'beast',
        'celestial',
        'construct',
        'dragon',
        'elemental',
        'fey',
        'fiend',
        'giant',
        'humanoid',
        'monstrosity',
        'ooze',
        'plant',
        'swarm of Tiny beasts',
        'undead',
    ],
};

