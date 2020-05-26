import { Condition, ConditionImmunity } from '../../rules/condition.enum';
import { lowerDamageType } from '../../rules/damageStatusType';
import { Book } from '../../rules/sourceBook.enum';
import { commaSplit, spaceJoin, spaceSplit, stripArray, findBetweenStrings } from '../../../app/common/string.functions';
import { Dice } from '../../../app/components/dice/dice';
import { ability, abilityAbbrev } from '../../rules/ability.enum';
import { Page } from '../../spells/spell.model';
import {
    ActionDamage, APIMonster, Proficiency, PurpleType, Trait, School, betterComponentsRequired, FluffyType
} from '../api-monster/apiMonster.model';
import { MonsterMonMan } from '../mon-man-text-monster/monsterMonMan';
import {
    Abilities, ActionElement, LegendaryActionElement, Meta, Monster, ReactionElement, Senses, Skills, Speed
} from './monster.model';
import { characterClass } from '../../characterClass.enum';
import { enumValuesArray } from '../../../app/common/enumKeysArray';
import { challengeRating } from 'src/models/rules/challengeRating.enum';

const classNames = enumValuesArray(characterClass);
const lowerClassNames = classNames.map(s => s.toLowerCase);

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
    'legendary', 'conditionImmunities', 'damageResistances', 'reactions', 'damageVulnerabilities', 'legendaryRules'
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
    traits: Trait[];
    actions: ActionElement[];
    armorClass?: number;
    hitPoints?: Dice;
    abilities: Abilities;
    passivePerception?: number;
    flavorText: string;
    armorType?: string;
    damageImmunities?: string[];
    savingThrows?: Abilities;
    legendary?: LegendaryActionElement[];
    legendaryRules?: string;
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
            this.name = '';
            this.meta = {
                size: '',
                monsterType: '',
                alignment: ''
            };
            this.speed = { walk: 30, hover: false };
            this.armorClass = 2;
            this.armorType = '';
            this.hitPoints = new Dice();
            this.abilities = {};
            this.senses = {};
            this.languages = ['-'];
            this.challenge = '';
        }
    }

    public static fromAPIMonster(m: APIMonster): MonsterCreature {
        const monster = new MonsterCreature(m);
        monster.armorClass = m.armor_class;
        monster.challenge = m.challenge_rating <= 1 && m.challenge_rating >= 0 ?
            `1/${String(1 / m.challenge_rating)}` : String(m.challenge_rating);
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
        if (m.special_abilities) {
            monster.traits = m.special_abilities/* .map(t => {
                        return t;
        }) */;
        }
        // specialAbilities ?: SpecialAbility[];
        // console.log(m.name);
        monster.actions = m.actions ? m.actions.map((a: ActionElement) => {
            if (a.damage) {
                a.damage = a.damage.map((d: ActionDamage) => {
                    if (d.damage_dice) {
                        const dice = d.damage_dice.split('d').map(n => Number(n));
                        d.damageDice = new Dice(dice[1], dice[0], d.damage_bonus);
                        delete d.damage_dice; delete d.damage_bonus;
                    }
                    if (d.damage_type) {
                        // const dice = d.damage_ice.split('d').map(n => Number(n));
                        d.damageType = d.damage_type.name;
                        delete d.damage_type;
                    }
                    return d;
                });
            }
            if (a.dc) {
                a.dc = {
                    dcType: a.dc.dc_type.name,
                    dcValue: a.dc.dc_value,
                    successType: a.dc.success_type
                };
            }
            return a;
        }) : [];
        // console.log(m.name);
        if (m.legendary_actions) {
            monster.legendary = m.legendary_actions;
        }

        if (m.reactions) {
            monster.reactions = m.reactions;
        }
        // actions ?: ActionElement[];
        // legendary ?: LegendaryActionElement[];
        // reactions ?: LegendaryActionElement[];
        /*

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
            // console.log(value.name);
            value.reactions = value.reaction.map((element: string) => {
                const actionObj: ReactionElement = { name: '', desc: '' };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.name = element.trim().substring(0, nameIndex);
                    actionObj.desc = element.trim().substring(nameIndex + indStr.length);
                    // console.log(`${value.name}: ${actionObj.name}. ${actionObj.desc}`);
                    // const actionDesc = actionObj.desc.replace(/ft./g, 'ft').split('. ');
                    /* Melee Weapon Attack: +5 to hit, reach 5 ft, one target.
                    Hit: 6 (1d6 + 3) slashing damage. */
                    const attackIndicators = ['Attack:', 'Hit:'];
                    const attackIndecies = attackIndicators.map(s => actionObj.desc.indexOf(s));
                    if (attackIndecies.every(n => n >= 0)) {
                        const actionDesc: string[] = [actionObj.desc.substring(attackIndecies[0], attackIndecies[1])]
                            .concat(actionObj.desc.substring(attackIndecies[1]).replace(/ft./g, 'ft').split('. '));
                        // actionObj.hitOrDC = true;
                        const descArray = commaSplit(actionDesc[0]
                            .substring(actionDesc[0].indexOf(attackIndicators[0]) + attackIndicators[0].length));
                        // Melee Weapon Attack: +5 to hit, reach 5 ft, one target.
                        // console.log(descArray);
                        actionObj.attackBonus = Number(spaceSplit(descArray[0].trim())[0]);
                        // console.log(actionDescObj.hit);
                        // actionDescObj.range = Number(spaceSplit(descArray[1].trim())[1]);
                        // actionDescObj.desc = descArray[2] ? descArray[2].trim() : null;
                        const damage = actionDesc[1];
                        // console.log(damage);
                        // .substring(actionDesc[1].indexOf(attackIndicators[1] + attackIndicators[1].length));
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
        return value;
    }

    private static setLegendary(value: any) {
        if (value.legendary) {
            value.legendaryRules = value.legendary[0];
            value.legendary = value.legendary.slice(1).map((element: string) => {
                const actionObj: LegendaryActionElement = { points: 1, name: '', desc: '' };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.name = element.trim().substring(0, nameIndex);
                    actionObj.desc = element.trim().substring(nameIndex + indStr.length);
                    const points: string = findBetweenStrings(actionObj.name, '(Costs ', ' Actions)');
                    if (points.length >= 0) {
                        actionObj.points = Number(points);
                    }
                    // const actionDesc = actionObj.desc.replace(/ft./g, 'ft').split('. ');
                    const attackIndicators = ['Attack:', 'Hit:'];
                    const attackIndecies = attackIndicators.map(s => actionObj.desc.indexOf(s));
                    if (attackIndecies.every(n => n >= 0)) {
                        const actionDesc: string[] = [actionObj.desc.substring(attackIndecies[0], attackIndecies[1])]
                            .concat(actionObj.desc.substring(attackIndecies[1]).replace(/ft./g, 'ft').split('. '));
                        const descArray = commaSplit(actionDesc[0]
                            .substring(actionDesc[0].indexOf(attackIndicators[0]) + attackIndicators[0].length));
                        // Melee Weapon Attack: +5 to hit, reach 5 ft, one target.
                        actionObj.attackBonus = Number(spaceSplit(descArray[0].trim())[0]);

                        actionObj.damage = actionDesc[1].split('plus').map(damString => {
                            const damageObj: ActionDamage = {};
                            const damageDice = actionDesc[1].indexOf(')');
                            damageObj.damageDice = Dice.fromString(findBetweenStrings(actionDesc[1].trim(), '(', ')'));
                            spaceSplit(actionDesc[1].substring(damageDice + 1).trim()).forEach(f => {
                                if (!damageObj.damageType && lowerDamageType[f.toLowerCase()]) {
                                    damageObj.damageType = lowerDamageType[f.toLowerCase()];
                                }
                            });
                            return damageObj;
                        });
                    } else if (actionObj.name.toLowerCase().indexOf('multiattack') >= 0) {
                        // console.log(`${value.name}: ${actionObj.name}. ${actionObj.desc}`);
                        // actionObj.options = {
                        //     choose: 1,
                        //     from: [
                        //         []
                        //     ]
                        // };
                    } else {
                        // actionObj.desc = element;
                        // console.log(`${value.name}: ${actionObj.name}. ${actionObj.desc}`);
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

    private static setActions(value: any) {
        if (value.actions) {
            value.actions = value.actions.map((element: string) => {
                const actionObj: ActionElement = { name: '', desc: '' };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    actionObj.name = element.trim().substring(0, nameIndex);
                    actionObj.desc = element.trim().substring(nameIndex + indStr.length);
                    const attackIndicators = ['Attack:', 'Hit:'];
                    const attackIndecies = attackIndicators.map(s => actionObj.desc.indexOf(s));
                    if (attackIndecies.every(n => n >= 0)) {
                        const actionDesc: string[] = [actionObj.desc.substring(attackIndecies[0], attackIndecies[1])]
                            .concat(actionObj.desc.substring(attackIndecies[1]).replace(/ft./g, 'ft').split('. '));
                        const descArray = commaSplit(actionDesc[0]
                            .substring(actionDesc[0].indexOf(attackIndicators[0]) + attackIndicators[0].length));
                        // Melee Weapon Attack: +5 to hit, reach 5 ft, one target.
                        actionObj.attackBonus = Number(spaceSplit(descArray[0].trim())[0]);

                        actionObj.damage = actionDesc[1].split('plus').map(damString => {
                            const damageObj: ActionDamage = {};
                            const damageDice = [damString.trim().indexOf('(', attackIndecies[1] + attackIndicators[1].length)];
                            damageDice.push(actionDesc[1].indexOf(')', damageDice[0]));
                            damageObj.damageDice = Dice.fromString(actionDesc[1].substring(damageDice[0] + 1, damageDice[1]));
                            spaceSplit(actionDesc[1].substring(damageDice[1] + 1).trim()).forEach(f => {
                                if (!damageObj.damageType && lowerDamageType[f.toLowerCase()]) {
                                    damageObj.damageType = lowerDamageType[f.toLowerCase()];
                                }
                            });
                            return damageObj;
                        });
                    } else if (actionObj.name.toLowerCase().indexOf('multiattack') >= 0) {
                        // console.log(`${value.name}: ${actionObj.name}. ${actionObj.desc}`);
                        actionObj.options = {
                            choose: 1,
                            from: [
                                []
                            ]
                        };
                    } else {
                        // actionObj.desc = element;
                        // console.log(`${value.name}: ${actionObj.name}. ${actionObj.desc}`);
                        // actionDescObj.text = actionDesc;
                    }
                    const r = 'recharge';
                    const pd = '/day';
                    if (actionObj.name.toLowerCase().indexOf(r) >= 0) {
                        // console.log(`${value.name}: ${actionObj.name}`);
                        const i = actionObj.name.toLowerCase().indexOf(r);

                        const k = actionObj.name.substring(i + r.length);
                        // console.log(actionObj.name, i, k);

                        const minMax = k.split('').map(f => Number(f)).filter(f => !isNaN(f) && f > 0);
                        // console.log(minMax);
                        actionObj.usage = {
                            type: PurpleType.RechargeAfterREST,
                            dice: new Dice(Math.max(...minMax)),
                            minValue: Math.min(...minMax)
                        };
                    } else if (actionObj.name.toLowerCase().indexOf(pd) >= 0) {
                        // console.log(`${value.name}: ${actionObj.name}`);
                        const i = actionObj.name.toLowerCase().indexOf('(');
                        const j = actionObj.name.toLowerCase().indexOf(pd);

                        const k = Number(actionObj.name.substring(i + 1, j));
                        // console.log(actionObj.name, i, k);

                        // const minMax = k.split('').map(f => Number(f)).filter(f => !isNaN(f));
                        actionObj.usage = {
                            type: PurpleType.PerDay,
                            times: k
                        };
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
            value.traits = value.traits.map((element: string) => {
                // const traitObj: { [key: string]: string[] } = {};
                const traitObj: Trait = { name: '', desc: '' };
                const indStr = '. ';
                const nameIndex = element.indexOf(indStr);
                if (nameIndex >= 0) {
                    traitObj.name = element.substring(0, nameIndex);
                    traitObj.desc = element.substring(nameIndex + indStr.length);
                    // } else if (traitObj.otherTraits) {
                    //     traitObj.otherTraits.push(element);

                    const pd = '/day';
                    const sp = 'spellcasting';
                    const isp = 'innate spellcasting';
                    if (traitObj.name.toLowerCase().indexOf(pd) >= 0) {
                        const i = traitObj.name.toLowerCase().indexOf('(');
                        const j = traitObj.name.toLowerCase().indexOf(pd);

                        const k = Number(traitObj.name.substring(i + 1, j));
                        // console.log(traitObj.name, i, k);

                        // const minMax = k.split('').map(f => Number(f)).filter(f => !isNaN(f));
                        traitObj.usage = {
                            type: PurpleType.PerDay,
                            times: k
                        };
                    }
                    if (traitObj.name.toLowerCase() === sp) {
                        MonsterCreature.spellCastingBuilder(traitObj, value.name);

                    } else if (traitObj.name.toLowerCase() === isp) {
                        MonsterCreature.innateSpellcastingBuilder(traitObj, value.name);
                    }
                } else {
                    traitObj.desc = element;
                    // traitObj.otherTraits.push(element);
                    // console.log(value.name, 'AAA');
                }
                return traitObj;
            });
        }
    }

    private static innateSpellcastingBuilder(traitObj: Trait, name: string) {
        const SpellUsage = [
            'at will'
        ].concat(['1/day', '2/day', '3/day', '4/day',
            '5/day', '6/day', '7/day', '8/day', '9/day'].reverse());
        const indecies: number[] = SpellUsage.map(s => traitObj.desc.toLowerCase().indexOf(s)).filter(f => f >= 0);
        // console.log(indecies);
        const sections = indecies.map((set, i) => i === indecies.length ?
            traitObj.desc.substring(set) : traitObj.desc.substring(set, indecies[i + 1])).map(s => s.split(':'));
        const Spells = []; // { 'name': 'Fly', 'url': '/api/spells/fly', 'usage': { 'type': 'per day', 'times': 3}}
        sections.forEach((el, i) => {
            const Usage = el[0].toLowerCase().indexOf(SpellUsage[0]) >= 0 ?
                { type: FluffyType.AtWill, } :
                { type: FluffyType.PerDay, times: Number(findBetweenStrings(el[0], '', '/day')) };
            el[1].split(',').forEach(e => Spells.push({ name: e.trim(), usage: Usage }));
        });
        // spells.sort((a,b) => {});
        const spellObj: any = { spells: Spells };
        // const schools = ['cleric', 'druid', 'wizard'];
        const bodyStr = traitObj.desc.substring(0, Math.min(...indecies));
        spellObj.spellcastingAbility = findBetweenStrings(bodyStr, 'ability is ', ' (', '.').substr(0, 3).toUpperCase();
        spellObj.dc = Number(findBetweenStrings(bodyStr.toLowerCase(), ' dc ', ',', ')'));
        spellObj.modifier = spellObj.dc - 8;
        traitObj.spellcasting = spellObj;
        if (isNaN(spellObj.dc)) {
            console.log(`Innate DC error: ${name}`);
        }
    }

    private static spellCastingBuilder(traitObj: Trait, name: string) {
        const SpellLevels = [
            'Cantrips', '1st level', '2nd level', '3rd level', '4th level',
            '5th level', '6th level', '7th level', '8th level', '9th level'
        ];
        // console.log(SpellLevels);
        // const spellAbility = 'spellcasting ability';
        const indecies: number[] = SpellLevels.map(s => traitObj.desc.indexOf(s)).filter(f => f >= 0);
        // console.log(indecies);
        const sections = indecies.map((set, i) => i === indecies.length ?
            traitObj.desc.substring(set) : traitObj.desc.substring(set, indecies[i + 1])).map(s => s.split(':'));
        // console.log(sections);
        const Slots: {
            [key: string]: number;
        } = {};
        sections.forEach((el, i) => {
            if (i > 0) {
                const idx = [el[0].indexOf('('), el[0].toLowerCase().indexOf(' slot')];
                if (idx.every(ind => ind >= 0)) {
                    Slots[i.toString()] = Number(el[0].substring(idx[0] + 1, idx[1]));
                } else {
                    console.log(`Slot error: ${name}-${el[0]}`);
                }
            }
        });
        const Spells = []; // {'name': 'Sacred Flame', 'level': 0,}
        sections.forEach((el, i) => {
            el[1].split(',').forEach(e => Spells.push({ name: e.trim(), level: i }));
        });
        // spells.sort((a,b) => {});
        const spellObj: any = { spells: Spells, slots: Slots };
        const bodyStr = traitObj.desc.substring(0, Math.min(...indecies));
        const spellLevel = findBetweenStrings(bodyStr, 'a ', '-level');
        spellObj.spellLevel = Number(spellLevel.substr(0, spellLevel.length - 2));
        spellObj.spellcastingAbility = findBetweenStrings(bodyStr, 'ability is ', ' (').substr(0, 3).toUpperCase();
        spellObj.dc = Number(findBetweenStrings(bodyStr, 'save DC ', ',', ')'));
        spellObj.modifier = spellObj.dc - 8;
        spellObj.componentsRequired = { V: true, S: true, M: true };
        spaceSplit(bodyStr.toLowerCase()).forEach(s => {
            if (lowerClassNames.indexOf(s) >= 0) {
                spellObj.school = s;
            } else if (betterComponentsRequired[s]) {
                spellObj.componentsRequired[betterComponentsRequired[s]] = false;
            }
        });
        if (isNaN(spellObj.dc)) {
            console.log(`Spellcasting DC error: ${name}`);
        }
        traitObj.spellcasting = spellObj;

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
                    let plusMinusIndex: number;
                    let skillValue: number;
                    if (s.indexOf('-') > 0) {
                        plusMinusIndex = s.indexOf('-');
                        skillValue = -1 * Number(s.substring(plusMinusIndex, s.length));
                    } else {
                        plusMinusIndex = s.indexOf('+');
                        skillValue = Number(s.substring(plusMinusIndex, s.length));
                    }
                    skillObj[s.substring(0, plusMinusIndex)] = skillValue;
                });
                if (Object.keys(skillObj).length > 0) {
                    value.skills = skillObj;
                }
                // .map(s => spaceSplit(s));
            } else if (this.propChecker('Senses', lineSS)) {
                const senses = spaceJoin(lineSS.splice(1)).replace(' ft.', 'ft.').replace('ft.', '').split(', ');
                const senseObj: any = {};
                const y = spaceSplit(senses.splice(-1)[0]).map(s => s.toLowerCase());
                value.passivePerception = Number(y[y.indexOf('perception') + 1]);
                senses.map(s => spaceSplit(s)).forEach(s => {
                    senseObj[spaceJoin(s.splice(0, s.length - 1))] = Number(s[s.length - 1].replace('ft.', ''));
                });
                if (Object.keys(senseObj).length > 0) {
                    value.senses = senseObj;
                }
            } else if (abilityAbbrev.indexOf(lineSS[0]) >= 0) {
                abilityAbbrev.forEach(aa => {
                    if (line.indexOf(aa) >= 0) {
                        value.abilities[aa] = Number(lineSS[lineSS.indexOf(aa) + 1]);
                    }
                });
                if (Object.keys(value.abilities).some(c => isNaN(value.abilities[c]))) {
                    console.log(value.name, JSON.stringify(value.abilities));
                }
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
            if (s !== 'walk' && s !== 'hover') {
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
        if (this.challenge) {
            return challengeRating[this.challenge].proficiency;
        } else if (this.savingThrows) {
            return Math.min(...Object.keys(this.savingThrows).map(ab => this.savingThrows[ab] - this.abilitiesModifiers[ab]));
        }
    }

    public get exp(): number {
        if (this.challenge) {
            // console.log(JSON.stringify(challengeRating[this.challenge]));
            return challengeRating[this.challenge].exp;
        }
    }

    public get senseString(): string {
        if (this.senses) {
            return Object.keys(this.senses)
                .map(s => `${s}: ${this.senses[s]} ft.`)
                .join(', ');
        } else {
            return '';
        }
    }

    public get saveString(): string {
        if (this.savingThrows) {
            return Object.keys(this.savingThrows)
                .map(s => this.savingThrows[s] > 0 ?
                    `${s.toUpperCase()}: +${this.savingThrows[s]}` : `${s.toUpperCase()}: ${this.savingThrows[s]}`)
                .join(', ');
        } else {
            return '';
        }
    }


    public get languageString(): string {
        if (this.languages) {
            // console.log(JSON.stringify(challengeRating[this.challenge]));
            return this.languages.join(', ');
        } else {
            return '-';
        }
    }


    public get skillString(): string {
        if (this.skills) {
            // console.log(JSON.stringify(challengeRating[this.challenge]));
            return Object.keys(this.skills)
                .map(s => this.skills[s] > 0 ? `${s}: +${this.skills[s]}` : `${s}: ${this.skills[s]}`)
                .join(', ');
        } else {
            return '';
        }
    }
}



