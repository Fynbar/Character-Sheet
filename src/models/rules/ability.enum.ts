export enum abbrevToAbility {
    STR = 'Strength',
    DEX = 'Dexterity',
    CON = 'Constitution',
    INT = 'Intelligence',
    WIS = 'Wisdom',
    CHA = 'Charisma'
}
export const ability = Object.values(abbrevToAbility);
export const abilityAbbrev = Object.keys(abbrevToAbility);
// const ab = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

// export const abilityAbbrev = ab.map(a => a.substr(0, 3).toUpperCase);
// export const ability = ab;

// const temp: = {};
// ab.forEach((a, i) => {
//     temp[abilityAbbrev[i]] = a;
// });
// export const abbrevToAbility = temp;
