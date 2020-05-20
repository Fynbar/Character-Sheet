import { Monster, Reaction, LegendaryActions, MonsterAction, Abilities, Senses, SpeedClass } from 'src/models/monster.model';
import { ConditionImmunity } from 'src/models/condition.enum';
import { stripString, spaceSplit, spaceJoin, stripArray, commaSplit } from '../../../common/string.functions';
import { abbrevToAbility, abilityAbbrev } from '../../../../models/ability.enum';
import { MonsterMonMan } from './monster-builder.component';
import { Dice } from '../../dice/dice';
import { Page } from '../../../../models/spell.model';
import { Book } from 'src/models/sourceBook.enum';

const properties = ['name', // string;
    'meta', 'page', 'speed', // string | SpeedClass;
    'skills', // {    [key', // string]', // number; };
    'senses', // Senses;
    'languages', // string[];
    'challenge', // string;
    'traits', // {
    'actions', // MonsterAction[];
    'imgurl', // string;
    'id', // number;
    'armorClass', // number;
    'armorType', // string;
    'hitPoints', // string;
    'abilities', // Abilities;
    'savingThrows', // Abilities;
    'passivePerception', // number;
    'legendaryActions', // LegendaryActions;
    'damageImmunities', // string[];
    'conditionImmunities', 'damageResistances', 'damageVulnerabilities', 'reactions'];
export class MonsterCreature implements Monster {
    // tslint:disable:variable-name
    name: string;
    meta: string;
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
    hitPoints: string;
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

    constructor(obj?: Monster) {
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
            this.meta = 's';
            this.speed = 's';
            this.armorClass = 2;
            this.armorType = 's';
            this.hitPoints = 's';
            this.abilities = {};
            this.senses = {};
            this.languages = ['-'];
            this.challenge = 's';
        }
    }


    public static fromPageDesc(m: MonsterMonMan): MonsterCreature {
        const sourcePage: Page = { page: m.page, book: Book.MM };
        const value: any = { name: m.name, actions: [], traits: [], page: sourcePage };
        const pageDesc = m.page_desc ? m.page_desc : '';
        const pageArray = pageDesc.split('\n');
        value.pageArray = pageArray;
        const LowerArray = value.pageArray.map((line: string) => stripString(line).toLowerCase());
        const UpperArray = value.pageArray.map((line: string) => stripString(line).toUpperCase());
        value.actionIndex = UpperArray.indexOf('ACTIONS');
        value.reactionIndex = UpperArray.indexOf('REACTIONS');
        value.legendaryIndex = UpperArray.indexOf('LEGENDARY ACTIONS');
        value.ChallangeIndex = Math.max(...value.pageArray.map((l, index) => this.propChecker('Challenge', spaceSplit(l)) ? index : 0));
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

        this.setActions(value);

        this.setLegendaryActions(value);

        this.setReactions(value);
        const unecessaryProps = [''];
        // unecessaryProps.forEach(prop => delete value.prop);
        return new MonsterCreature(value);
    }


    private static setReactions(value: any) {
        if (value.reaction) {
            value.reactions = value.reaction.map((element: string) => {
                const actionObj: any = {};
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.actionsName = stripString(element).substring(0, nameIndex);
                    actionObj.actionDesc = stripString(element).substring(nameIndex + indStr.length).replace('ft.', 'ft').split('. ');
                } else if (actionObj.otherTraits) {
                    actionObj.otherTraits.push(stripString(element));
                } else {
                    actionObj.otherTraits = [];
                    actionObj.otherTraits.push(stripString(element));
                }
                // console.log(actionObj);
                return actionObj;
            });
        }
        delete value.pageArray;
        return value;
    }

    private static setLegendaryActions(value: any) {
        if (value.legendary) {
            const legendaryObj: any = { rules: value.legendary[0] };
            legendaryObj.legendaryActions = value.legendary.slice(1).map((element: string) => {
                const actionObj: any = { actionsPoints: 1 };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.actionsName = stripString(element).substring(0, nameIndex);
                    actionObj.actionDesc = stripString(element).substring(nameIndex + indStr.length).replace('ft.', 'ft').split('. ');
                    const costString = '(Costs ';
                    const actionsPoints: number[] = [costString, ' Actions)'].map(seg => actionObj.actionsName.indexOf(seg));
                    if (Math.min(...actionsPoints) >= 0) {
                        actionObj.actionsPoints = Number(actionObj.actionsName
                            .substring(actionsPoints[0] + costString.length, actionsPoints[1]));
                    }
                } else if (actionObj.otherTraits) {
                    actionObj.otherTraits.push(stripString(element));
                } else {
                    actionObj.otherTraits = [];
                    actionObj.otherTraits.push(stripString(element));
                }
                return actionObj;
            });
            value.legendaryActions = legendaryObj;
        }
    }

    private static setActions(value: any) {
        if (value.actions) {
            value.actions = value.actions.map((element: string) => {
                const actionObj: any = {};
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.actionsName = stripString(element).substring(0, nameIndex);
                    actionObj.actionDesc = stripString(element).substring(nameIndex + indStr.length).replace('ft.', 'ft').split('. ');
                } else if (actionObj.otherTraits) {
                    actionObj.otherTraits.push(stripString(element));
                } else {
                    actionObj.otherTraits = [];
                    actionObj.otherTraits.push(stripString(element));
                }
                return actionObj;
            });
        }
    }

    private static setTraits(value: any) {
        if (value.traits) {
            value.traits = value.traits.map((element: string) => {
                const traitObj: any = {};
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    traitObj[element.substring(0, nameIndex)] = element.substring(nameIndex + indStr.length);
                } else if (traitObj.otherTraits) {
                    traitObj.otherTraits.push(element);
                } else {
                    traitObj.otherTraits = [];
                    traitObj.otherTraits.push(element);
                }
                return traitObj;
            });
        }
    }

    private static setMetaData(value: any) {
        if (value.pageArray[0].length > 0) {
            const tempMeta = value.pageArray[0].split(', ');
            const tempMetaFist = spaceSplit(tempMeta[0]);
            value.meta = {
                size: tempMetaFist[0], monsterType: spaceJoin(tempMetaFist.slice(1)), alignment: tempMeta[1]
            };
        }
    }

    private static setMonsterProperties(value: any) {
        const pageArray = value.pageArray;
        pageArray.forEach((line: string, index: number) => {
            const lineSS = spaceSplit(stripString(line));
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
                const speedObj: any = { walking: Number(speeds[0][0])};
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
                const abilitiesObj: any = {};
                abilityAbbrev.forEach(aa => abilitiesObj[aa] = Number(lineSS[lineSS.indexOf(aa) + 1]));
                value.abilities = abilitiesObj;
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
}
