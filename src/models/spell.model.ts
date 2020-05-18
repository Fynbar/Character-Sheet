import { DurationUnits, CastingTimeUnits } from './timeUnits.enum';
import { Book } from './sourceBook.enum';
import { spellSchool } from './spellSchool.enum';
import { spellSavingThrow } from './spellSavingThrow.enum';
import { RangeUnits } from './rangeUnits.enum';
import { characterClass, druidDomain, Oath, Patron } from './characterClass.enum';

export type Spells = Spell[];
export interface Spell {
    name: string;
    desc: string[];
    page: Page;
    range: Range;
    material?: string;
    ritual: boolean;
    duration: Duration;
    concentration: boolean;
    casting_time: CastingTime;
    level: number;
    school: spellSchool;
    class: characterClass[];
    id: number;
    V: boolean;
    S: boolean;
    M: boolean;
    dice: string[];
    halfOnSave: boolean;
    savingThrow: spellSavingThrow | null;
    attack_roll: boolean;
    effects: Effect[];
    higher_level?: string[];
    archetype?: Archetype[];
    domains?: druidDomain[];
    oaths?: Oath[];
    circles?: string[];
    patrons?: Patron[];
}

export interface Archetype {
    class: characterClass;
    archetype: string;
}

export interface CastingTime {
    time: number;
    units: CastingTimeUnits;
}



export interface Duration {
    time?: number;
    units?: DurationUnits;
    up_to?: boolean;
    until_dispel?: boolean;
    special?: boolean;
}

export interface Effect {
    damage?: boolean;
}

export interface Page {
    page?: number;
    book?: Book;
}

export interface Range {
    dist: number;
    units: RangeUnits;
    area?: Area;
}

export interface Area {
    dist: number;
    units: string;
}
