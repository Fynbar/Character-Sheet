import { HtmlParser, ThisReceiver } from '@angular/compiler';
import { breakBySubstrings, cap, isIn, spaceSplit } from 'src/app/common/string.functions';
import { DamageType } from '../rules/damage-type';
import { Condition, DamageInflict, DMGElement, ImmuneEnum, Size, Speed, ToolsMon, ToolsMonster, TypeTypeEnum } from './tools-monster';

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
    conditions: TetraCond[];
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

export interface TetraCond {
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
const properties = [
    'name', // string;
    'size', // string;
    'type', // string;
    'tag', // string;
    'alignment', // string;
    'hitDice', // string;
    'armorName', // string;
    'shieldBonus', // number;
    'natArmorBonus', // number;
    'otherArmorDesc', // string;
    'speed', // string;
    'burrowSpeed', // string;
    'climbSpeed', // string;
    'flySpeed', // string;
    'hover', // boolean;
    'swimSpeed', // string;
    'customHP', // boolean;
    'customSpeed', // boolean;
    'hpText', // string;
    'speedDesc', // string;
    'strPoints', // string;
    'dexPoints', // string;
    'conPoints', // string;
    'intPoints', // string;
    'wisPoints', // string;
    'chaPoints', // string;
    'blindsight', // string;
    'blind', // boolean;
    'darkvision', // string;
    'tremorsense', // string;
    'truesight', // string;
    'telepathy', // number;
    'cr', // string;
    'customCr', // string;
    'customProf', // number;
    'isLegendary', // boolean;
    'legendariesDescription', // string;
    'isLair', // boolean;
    'lairDescription', // string;
    'lairDescriptionEnd', // string;
    'isRegional', // boolean;
    'regionalDescription', // string;
    'regionalDescriptionEnd', // string;
    'properties', // any[];
    'abilities', // Ability[];
    'actions', // Ability[];
    'reactions', // Ability[];
    'legendaries', // Ability[];
    'lairs', // Ability[];
    'regionals', // Ability[];
    'sthrows', // Sthrow[];
    'skills', // Skill[];
    'damagetypes', // Damagetype[];
    'specialdamage', // Damagetype[];
    'conditions', // Condition[];
    'languages', // Language[];
    'understandsBut', // string;
    'shortName', // string;
    'doubleColumns', // boolean;
    'separationPoint', // number;
    'damage', // any[];
    'pluralName', // string;
]
export enum SizeToDie {
    tiny = 4,
    small = 6,
    medium = 8,
    large = 10,
    huge = 12,
    gargantuan = 20,
}

export function toModifier(ability:number): number {
   return Math.floor(ability/2)-5;
};

class TetraMon implements TetraMonster{
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
    conditions: TetraCond[];
    languages: Language[];
    understandsBut: string;
    shortName: string;
    doubleColumns: boolean;
    separationPoint: number;
    damage: any[];
    pluralName?: string;

    constructor(obj: TetraMonster) {
        if (obj) {
            const missingProp = [];
            properties.forEach(element => {
                if (obj[element]) {
                    this[element] = obj[element];
                } else {
                    missingProp.push(element);
                }
            });
        } else {

        }
    }

    public toToolMon(): ToolsMonster {
        const Tool = new ToolsMon();
        Tool.name = this.name;
        // Type/Tags
        const monType = TypeTypeEnum[cap(this.type)]
        if (this.tag.length>0) {
            Tool.type = {
                type: monType,
                tags: [this.tag]
            };
        } else {
            Tool.type = monType
        }
        // Size
        Tool.size=Size[this.size.charAt(0).toUpperCase()]

        // HP
        let HPstring = '';
        let HPavg = 0;
        if (this.customHP) {
            const broken = breakBySubstrings(this.hpText, '(', ')')
            HPavg = +broken[0]
            HPstring = broken[1]
        } else {
            HPstring = `(${this.hitDice}d${SizeToDie[this.size]}+${toModifier(+this.conPoints)*(+this.hitDice)})`;
            HPavg = (SizeToDie[this.size]/2+toModifier(+this.conPoints))*(+this.hitDice);
        }
        Tool.hp = {formula: HPstring,
                    average: HPavg }
        // AC
            // Tool.ac = {}

        // Speeds
        const speedNames = ['fly', 'swim','climb','burrow']
        const speedObj:Speed={};
        if (this.customSpeed){
            alert(`${this.name} has a janky speed. idk, don't make me do this`);
        } else {
            if (this.speed!=='0'){speedObj.walk= (+this.speed)}
            speedNames.forEach(sp => {
                if (this[sp+'Speed']!=='0'){speedObj[sp]=this[sp+'speed']};
            });
            if (this.hover){speedObj.canHover= (this.hover)}
        }
        Tool.speed=speedObj

        // Abilities
        const Abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        Abilities.forEach(abil => {
            Tool[abil] = this[abil+'Points']
        });

        // CR
        if (this.cr!=='*') {
            Tool.cr = this.cr
            this.customProf = Math.ceil((+this.cr)/4)+1
        } else if (isIn(this.customCr, 'lair')) {
            // 'customCr': '19 (22,000 XP) or 20 (25,000 XP) when encountered in lair',
            const broken = spaceSplit(this.customCr)
            Tool.cr = {
                cr: broken[0],
                lair: broken[4]
            }
        } else  {
            const broken = spaceSplit(this.customCr)
            Tool.cr = {
                cr: broken[0],
                xp: broken[2].substring(1)
            }
        }
        // Saves
        this.sthrows.forEach(st => {
            Tool.save[st.name] = (toModifier(this[st.name+'Points'])+this.customProf).toString();
        });

        // Skills
            let a = 0;
            this.skills.forEach(sk => {
                a = sk.hasOwnProperty('note')? 2:1;
                Tool.skill[sk.name] = toModifier(this[sk.stat+'Points'])+this.customProf*a
            });

        // Res/Imm/Vuln
        const imm = this.specialdamage.filter(dam=> dam.type==='i').map(dam => DamageType[cap(dam.name)])
        const res = this.damagetypes.filter(dam=> dam.type==='r').map(dam => DamageType[cap(dam.name)])
        const vul = this.damagetypes.filter(dam=> dam.type==='v').map(dam => DamageType[cap(dam.name)])
        if(imm.length > 0){Tool.immune=imm};
        if(res.length > 0){Tool.resist=res};
        if(vul.length > 0){Tool.vulnerable=vul};

        // CondImm
        if(this.conditions.length > 0){
            Tool.conditionImmune=this.conditions.map(cond => Condition[cap(cond.name)])
        }

        // Languages
        const speakLang = this.languages.filter(lan=> lan.speaks).map(lan =>cap(lan.name))
        const knownLang = this.languages.filter(lan=> !lan.speaks).map(lan =>cap(lan.name))
        if(speakLang.length > 0){
            // Tool.languages= [...speakLang, ...knownLang]
        } else {
            Tool.languages=speakLang
        }

        // Sense
        const tetraSenses = ['darkvision', 'blindsight', 'tremorsense', 'truesight']
        Tool.senses = tetraSenses.filter(s=>this[s]!=='0').map(s=>{
            let sText: string;
            if (s!== 'blindsight') {
                sText = `${s} ${this[s]} ft.`
            } else {
                sText = `${s} ${this[s]} ft.${this.blind?' (blind beyond this radius)':''}`
            }
            return sText
        });

        // Traits

        // -Spell Casting
        // Actions
        // -Weapon Attacks
        // Regional Effects
        // Legendary Actions
        // Lair Actions
        // Bonus Actions
        // Search Tags
        return Tool;
    }

    private nameSort(text: string): string {
        return text.replace('[MON]', this.shortName).replace('[MONS]', this.pluralName);
    }

}

