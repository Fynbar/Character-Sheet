import { ConditionImmunity, Condition } from 'src/models/rules/condition.enum';
import { Abilities, LegendaryActionElement, Monster, ActionElement, ReactionElement, Senses, Meta, Speed, Skills } from './monster.model';
import { Book } from 'src/models/rules/sourceBook.enum';
import { abilityAbbrev, ability } from '../../rules/ability.enum';
import { Page } from '../../spells/spell.model';
import { spaceJoin, spaceSplit, stripArray, commaSplit } from '../../../app/common/string.functions';
import { Dice } from '../../../app/components/dice/dice';
import { MonsterMonMan } from '../mon-man-text-monster/monsterMonMan';
import { forEach } from '@angular/router/src/utils/collection';
import { APIMonster, ProficiencyName, Proficiency } from '../api-monster/apiMonster.model';
// import { ReactionElement, LegendaryActionElement, ActionElement } from '../api-monster/SpecialAbility';

// tslint:disable:max-line-length
const properties = [
    'name', // string;
    'meta', //  Meta;
    'page', // Page;
    'speed', //  Speed;
    'skills', //  Skills;
    'senses', //  Senses;
    'languages', //  string[];
    'challenge', // string;
    'traits', // { [key', // string]', // string[] };
    'actions', // ActionElement[];
    'armorClass', //  number;
    'hitPoints', //  Dice;
    'abilities', // Abilities;
    'passivePerception', //  number;
    'flavorText', // string;
    'armorType', //  string;
    'damageImmunities', //  string[];
    'savingThrows', //  Abilities;
    'Legendary', //  LegendaryActionElement[];
    'conditionImmunities', //  ConditionImmunity[];
    'damageResistances', //  string[];
    'reactions', //  ReactionElement[];
    'damageVulnerabilities', //  string[];
];
// tslint:enable:max-line-length
export class MonsterCreature implements Monster {
    name: string;
    meta?: Meta;
    page: Page;
    speed?: Speed;
    skills?: Skills;
    senses?: Senses;
    languages?: string[];
    challenge: string;
    traits: { [key: string]: string[] };
    actions: ActionElement[];
    armorClass?: number;
    hitPoints?: Dice;
    abilities: Abilities;
    passivePerception?: number;
    flavorText: string;
    armorType?: string;
    damageImmunities?: string[];
    savingThrows?: Abilities;
    Legendary?: LegendaryActionElement[];
    conditionImmunities?: ConditionImmunity[];
    damageResistances?: string[];
    reactions?: ReactionElement[];
    damageVulnerabilities?: string[];

    constructor(obj?: Monster | APIMonster) {
        if (obj) {
            const missingProp = [];
            properties.forEach(element => {
                if (obj[element]) {
                    this[element] = obj[element];
                } else {
                    missingProp.push(element);
                }
            });
            // console.log(`${this.name} is Missing: ${missingProp.join(', ')}`);
        } else {
            this.name = 's';
            this.meta = {
                size: 's',
                monsterType: 's',
                alignment: 's'
            };
            this.speed = { walk: 30, hover: false };
            this.armorClass = 2;
            this.armorType = 's';
            this.hitPoints = new Dice();
            this.abilities = {};
            this.senses = {};
            this.languages = ['-'];
            this.challenge = 's';
        }
    }

    public static fromAPIMonster(m: APIMonster): MonsterCreature {

        const monster = new MonsterCreature(m);
        monster.armorClass = m.armor_class;
        monster.challenge = String(m.challenge_rating);
        monster.meta = {
            size: m.size,
            alignment: m.alignment,
            monsterType: m.type
        };
        // if (m.other_speeds) {
        //     console.log(`${m.name}: ${JSON.stringify(m.other_speeds)}`);
        // }

        if (m.subtype) {
            monster.meta.monsterSubType = m.subtype;
        }
        const abilities = {};
        ability.forEach(a => abilities[a.substring(0, 3).toUpperCase()] = m[a.toLowerCase()]);
        monster.abilities = abilities;
        const hitDice: number[] = m.hit_dice.split('d').map(d => Number(d));
        monster.hitPoints = new Dice(hitDice[1], hitDice[0], hitDice[0] * monster.abilitiesModifiers.CON);
        if (m.damage_vulnerabilities) {
            monster.damageVulnerabilities = m.damage_vulnerabilities;
        }
        if (m.damage_resistances) {
            monster.damageResistances = m.damage_resistances;
        }
        if (m.damage_immunities) {
            monster.damageImmunities = m.damage_immunities;
        }
        if (m.condition_immunities) {
            monster.conditionImmunities = m.condition_immunities.map(c => c.name).filter(c => Condition[c]);
        }
        let speedObj: Speed = { walk: 30, hover: false }; // APIMonsterSpeed;
        // speedObj.
        Object.keys(m.speed).forEach(s => {
            if (s !== 'hover') {
                speedObj[s] = Number(m.speed[s].split(' ')[0]);
            } else {
                speedObj[s] = m.speed[s];
            }
        });
        speedObj = speedObj;
        monster.speed = speedObj;

        monster.languages = commaSplit(m.languages);
        let proficiencyObj = { savingThrows: {}, skills: {} };
        m.proficiencies.forEach((prof: Proficiency) => {
            const profName: string[] = prof.name.split(': ');
            if (profName[0] === 'Saving Throw') {
                proficiencyObj.savingThrows[profName[1]] = prof.value;
            } else if (profName[0] === 'Skill') {
                proficiencyObj.skills[profName[1]] = prof.value;
            }
        });
        proficiencyObj = proficiencyObj;
        monster.savingThrows = proficiencyObj.savingThrows;
        monster.skills = proficiencyObj.skills;

        const senseObj: Senses = {};
        Object.keys(m.senses).forEach(s => {
            if (s !== 'passive_perception') {
                senseObj[s] = Number(m.senses[s].split(' ')[0]);
            } else {
                monster.passivePerception = m.speed[s];
            }
        });
        /*
        specialAbilities?: SpecialAbility[];
        actions?: ActionElement[];
        legendaryActions?: LegendaryActionElement[];
        reactions?: LegendaryActionElement[];
        otherSpeeds?: OtherSpeed[];*/
        return monster;
    }

    public static fromPageDesc(m: MonsterMonMan): MonsterCreature {
        const sourcePage: Page = { page: m.page, book: Book.MM };
        const value: any = {
            name: m.name, actions: [], traits: [], page: sourcePage, abilities: {}, flavorText: m.see ? m.see : m.flavor_text
        };
        const pageDesc = m.page_desc ? m.page_desc : '';
        const pageArray = pageDesc.split('\n');
        value.pageArray = pageArray;
        const LowerArray = value.pageArray.map((line: string) => line.trim().toLowerCase());
        const UpperArray = value.pageArray.map((line: string) => line.trim().toUpperCase());
        value.actionIndex = UpperArray.indexOf('ACTIONS');
        value.reactionIndex = UpperArray.indexOf('REACTIONS');
        value.legendaryIndex = UpperArray.indexOf('LEGENDARY ACTIONS');
        value.ChallangeIndex = Math.max(
            ...value.pageArray.map(
                (l, index) => this.propChecker('Challenge', spaceSplit(l)) ? index : 0).concat(
                    abilityAbbrev.map(aa => Math.max(
                        ...value.pageArray.map((l, index) => this.propChecker(aa, spaceSplit(l)) ? index : 0)
                    ))
                )
        );
        this.setMetaData(value);
        const fillerObj: any = {
            actions: 'actionIndex',
            reaction: 'reactionIndex',
            legendary: 'legendaryIndex'
        };
        const idxs = Object.keys(fillerObj).filter(k => value[fillerObj[k]] >= 0)
            .sort((a, b) => value[fillerObj[a]] > value[fillerObj[b]] ? 1 : -1);
        if (value.ChallangeIndex >= 0) {
            this.setMonsterProperties(value);
            // Armor Class 19 (natural armor)
        }
        value.traits = pageArray.slice(value.ChallangeIndex + 1, value[fillerObj[idxs[0]]]);
        idxs.forEach((prop, index) => {
            if (index === idxs.length - 1) {
                value[prop] = pageArray.slice(value[fillerObj[prop]] + 1);
            } else {
                value[prop] = pageArray.slice(value[fillerObj[prop]] + 1, value[fillerObj[idxs[index + 1]]]);
            }
        });

        this.setTraits(value);
        // console.log(value.traits);
        this.setActions(value);

        this.setLegendary(value);

        this.setReactions(value);
        const unecessaryProps = [''];
        const monster = new MonsterCreature(value);
        // unecessaryProps.forEach(prop => delete value.prop);
        // console.log(monster.name, monster.abilitiesModifiers);
        return monster;
    }

    private static setReactions(value: any) {
        if (value.reaction) {
            value.reactions = value.reaction.map((element: string) => {
                const actionObj: ReactionElement = { name: '', desc: '' };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.name = element.trim().substring(0, nameIndex);
                    actionObj.desc = element.trim().substring(nameIndex + indStr.length);
                    const actionDesc = actionObj.desc.replace(/ft./g, 'ft').split('. ');
                } else if (actionObj.otherActions) {
                    actionObj.otherActions.push(element.trim());
                } else {
                    actionObj.otherActions = [];
                    actionObj.otherActions.push(element.trim());
                }
                // console.log(actionObj);
                return actionObj;
            });
        }
        return value;
    }

    private static setLegendary(value: any) {
        if (value.legendary) {
            value.LegendaryRules = value.legendary[0];
            value.legendaryActions = value.legendary.slice(1).map((element: string) => {
                const actionObj: LegendaryActionElement = { points: 1, name: '', desc: '' };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.name = element.trim().substring(0, nameIndex);
                    actionObj.desc = element.trim().substring(nameIndex + indStr.length);
                    const actionDesc = actionObj.desc.replace(/ft./g, 'ft').split('. ');
                    const costString = '(Costs ';
                    const actionPoints: number[] = [costString, ' Actions)'].map(seg => actionObj.name.indexOf(seg));
                    if (Math.min(...actionPoints) >= 0) {
                        actionObj.points = Number(actionObj.name
                            .substring(actionPoints[0] + costString.length, actionPoints[1]));
                    }
                } else if (actionObj.otherActions) {
                    actionObj.otherActions.push(element.trim());
                } else {
                    actionObj.otherActions = [];
                    actionObj.otherActions.push(element.trim());
                }
                return actionObj;
            });
        }
    }

    private static setActions(value: any) {
        if (value.actions) {
            value.actions = value.actions.map((element: string) => {
                const actionObj: ActionElement = { name: '', desc: '' };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.name = element.trim().substring(0, nameIndex);
                    actionObj.desc = element.trim().substring(nameIndex + indStr.length);
                    const actionDesc = actionObj.desc.replace(/ft./g, 'ft').split('. ');
                    /* Melee Weapon Attack: +5 to hit, reach 5 ft, one target.
                    Hit: 6 (1d6 + 3) slashing damage. */
                    const actionDescObj: any = {  };
                    const attackIndicators = ['Attack:', 'Hit:'];
                    if (actionDesc.length === 2) {
                        if (attackIndicators.every((s, index) => actionDesc[index].indexOf(s) >= 0)) {
                            console.log(`${value.name}: ${actionObj.desc}. ${actionObj.desc}`);
                            // actionObj.hitOrDC = true;
                            const descArray = commaSplit(actionDesc[0]
                                .substring(actionDesc[0].indexOf(attackIndicators[0]) + attackIndicators[0].length));
                            // Melee Weapon Attack: +5 to hit, reach 5 ft, one target.
                            // console.log(descArray);
                            actionDescObj.hit = Number(spaceSplit(descArray[0].trim())[0]);
                            // console.log(actionDescObj.hit);
                            actionDescObj.range = Number(spaceSplit(descArray[1].trim())[1]);
                            actionDescObj.desc = descArray[2] ? descArray[2].trim() : null;
                            actionDescObj.damage = actionDesc[1]
                                .substring(actionDesc[1].indexOf(attackIndicators[1] + attackIndicators[1].length));
                        } else {
                            // actionObj.hitOrDC = false;
                            // actionDescObj.text = actionDesc;
                        }
                    } else {
                        // actionObj.hitOrDC = false;
                        // actionDescObj.text = actionDesc;
                    }
                    // actionObj.actionDesc = actionDescObj;
                } else if (actionObj.otherActions) {
                    actionObj.otherActions.push(element.trim());
                } else {
                    actionObj.otherActions = [];
                    actionObj.otherActions.push(element.trim());
                }
                return actionObj;
            });
        }
    }

    private static setTraits(value: any) {
        if (value.traits) {
            const traitObj: { [key: string]: string[] } = {};
            value.traits.forEach((element: string) => {
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    traitObj[element.substring(0, nameIndex)] = [element.substring(nameIndex + indStr.length)];
                } else if (traitObj.otherTraits) {
                    traitObj.otherTraits.push(element);
                } else {
                    traitObj.otherTraits = [];
                    traitObj.otherTraits.push(element);
                    console.log(value.name, 'AAA');
                }
            });
            value.traits = traitObj;
        }
    }

    private static setMetaData(value: any) {
        if (value.pageArray[0].length > 0) {

            const tempMeta = value.pageArray[0].trim().split(', ');
            const tempMetaFist = spaceSplit(tempMeta[0]);
            const type = spaceJoin(tempMetaFist.slice(1)).trim();
            const obj: any = {
                size: tempMetaFist[0], alignment: tempMeta[1]
            };
            if (type.indexOf('(') >= 0) {
                const points = [type.indexOf('('), type.indexOf(')')];
                obj.monsterType = type.substring(0, points[0]).trim();
                obj.monsterSubType = type.substring(points[0] + 1, points[1]).trim();
                // console.log(obj);
            } else {
                obj.monsterType = type;
            }

            value.meta = obj;
        }
    }

    private static setMonsterProperties(value: any) {
        const pageArray = value.pageArray;
        pageArray.forEach((line: string, index: number) => {
            const lineSS = spaceSplit(line.trim());
            if (this.propChecker('Armor Class', lineSS)) {
                let AC = lineSS.splice(2);
                AC = stripArray(AC);
                // console.log(AC);
                value.armorClass = AC[0];
                const armorType = spaceJoin(AC.splice(1));
                value.armorType = armorType.substring(1, armorType.length - 1);
            } else if (this.propChecker('Hit Points', lineSS)) {
                let HP = spaceJoin(lineSS.splice(3));
                const parenth = ['(', ')'];
                const hitDiceEnds: number[] = parenth.map(seg => HP.indexOf(seg));
                if (Math.min(...hitDiceEnds) >= 0) {
                    HP = HP.substring(hitDiceEnds[0] + parenth[0].length, hitDiceEnds[1]);
                    let d: number[];
                    let c: number;
                    // console.log(HP);
                    if (HP.indexOf('+') > 0 || HP.indexOf('-') > 0) {
                        const HPs = spaceSplit(HP);
                        d = HPs[0].split('d').map(e => Number(e));
                        c = HPs[1] === '+' ? Number(HPs[2]) : -1 * (Number(HPs[2]));
                    } else {
                        d = HP.split('d').map(e => Number(e));
                        c = 0;
                    }
                    value.hitPoints = new Dice(d[1], d[0], c);
                    // { constant: c, dice_type: d[1], dice_num: d[0] };
                } else {
                    console.log(`Hit dice Error: ${value.name}`);
                }
            } else if (this.propChecker('Speed', lineSS)) {
                const speeds = spaceJoin(lineSS.splice(1)).split(', ').map(s => spaceSplit(s.replace('ft.', '')));
                const speedObj: any = { walk: Number(speeds[0][0]) };
                speeds.splice(1).forEach(s => speedObj[s[0]] = Number(s[1]));
                speedObj.hover = line.indexOf('hover') >= 0;
                value.speed = speedObj;
            } else if (this.propChecker('Skills', lineSS)) {
                const skills = spaceJoin(lineSS.splice(1)).replace(/\s/g, '').split(',');
                const skillObj: any = {};
                skills.forEach(s => {
                    let plusMinusIndex;
                    let skillValue;
                    if (s.indexOf('-') > 0) {
                        plusMinusIndex = s.indexOf('-');
                        skillValue = -1 * Number(s.substring(plusMinusIndex, s.length));
                    } else {
                        plusMinusIndex = s.indexOf('+');
                        skillValue = Number(s.substring(plusMinusIndex, s.length));
                    }
                    skillObj[s.substring(0, plusMinusIndex)] = skillValue;
                });
                value.skills = skillObj;
                // .map(s => spaceSplit(s));
            } else if (this.propChecker('Senses', lineSS)) {
                const senses = spaceJoin(lineSS.splice(1)).replace(' ft.', 'ft.').replace('ft.', '').split(', ');
                const senseObj: any = {};
                const y = spaceSplit(senses.splice(-1)[0]).map(s => s.toLowerCase());
                value.passivePerception = Number(y[y.indexOf('perception') + 1]);
                // console.log(senses.map(s => spaceSplit(s))); // .splice(0, senses.length - 1));
                senses.map(s => spaceSplit(s)).forEach(s => {
                    // console.log(s[s.length - 1], );
                    senseObj[spaceJoin(s.splice(0, s.length - 1))] = Number(s[s.length - 1].replace('ft.', ''));
                });
                value.senses = senseObj;
            } else if (abilityAbbrev.indexOf(lineSS[0]) >= 0) {
                abilityAbbrev.forEach(aa => {
                    if (line.indexOf(aa) >= 0) {
                        value.abilities[aa] = Number(lineSS[lineSS.indexOf(aa) + 1]);
                    }
                });
            } else if (this.propChecker('Languages', lineSS)) {
                value.languages = spaceJoin(lineSS.splice(1)).split(', ');
            } else if (this.propChecker('Challenge', lineSS)) {
                const str = spaceJoin(lineSS.splice(1));
                value.challenge = str.substring(0, str.indexOf(' ('));
            } else if (this.propChecker('Damage Resistances', lineSS) || this.propChecker('Damage Resistance', lineSS)) {
                value.damageResistances = spaceJoin(lineSS.splice(2)).split(', ');
            } else if (this.propChecker('Damage Immunities', lineSS)) {
                value.damageImmunities = spaceJoin(lineSS.splice(2)).split(', ');
            } else if (this.propChecker('Condition Immunities', lineSS)) {
                value.conditionImmunities = spaceJoin(lineSS.splice(2)).split(', ');
            } else if (this.propChecker('Damage Vulnerabilities', lineSS)) {
                value.damageVulnerabilities = spaceJoin(lineSS.splice(2)).split(', ');
            } else if (this.propChecker('Saving Throws', lineSS)) {
                const st = spaceJoin(lineSS.splice(2)).split(', ');
                const abilitiesObj: any = {};
                st.forEach(s => {
                    s = s.replace(' ', '');
                    const isMinus = s.indexOf('-');
                    const i = isMinus >= 0 ? isMinus : s.indexOf('+');
                    abilitiesObj[s.substring(0, i)] = isMinus >= 0 ? -1 * Number(s.substring(i + 1)) : Number(s.substring(i + 1));
                });
                value.savingThrows = abilitiesObj;
            } else if (index > 0 && index <= value.ChallangeIndex) {
                console.log(`${value.name}: ${spaceJoin(lineSS.splice(0, 2))}`);
            }
        });
    }

    private static propChecker(str: string, lineSS: string[]): boolean {
        return spaceSplit(str).every((word, i) => word === lineSS[i]);
    }

    public get abilitiesModifiers(): Abilities {
        const modObj: Abilities = {};
        abilityAbbrev.forEach(aa => modObj[aa] = Math.floor((this.abilities[aa] - 10) / 2));
        return modObj;
    }

    public get metaString() {
        return `${this.meta.size} ${this.meta.monsterType}, ${this.meta.alignment}`;
    }

    public get armorString() {
        return `${this.armorClass} ${this.armorType ? '(' + this.armorType + ')' : ''}`;
    }

    public get speedString() {
        let walk = `${this.speed.walk} ft.${this.speed.hover ? ' (Hover)' : ''}`;
        Object.keys(this.speed).forEach(s => {
            if (s !== 'walking' && s !== 'hover') {
                walk = walk + `, ${s} ${this.speed[s]} ft.`;
            }
        });
        return walk;
    }

    public get modifierStrings() {
        const obj = {};
        Object.keys(this.abilitiesModifiers)
            .forEach(a => obj[a] = this.abilitiesModifiers[a] < 0 ? `${this.abilitiesModifiers[a]}` : `+${this.abilitiesModifiers[a]}`);
        return obj;
    }

    public get traitNames(): string[] {
        return this.traits ? Object.keys(this.traits) : [];
    }

    public get proficiency(): number {
        if (this.savingThrows) {
            return Math.min(...Object.keys(this.savingThrows).map(ab => this.savingThrows[ab] - this.abilitiesModifiers[ab]));
        }
    }
}


