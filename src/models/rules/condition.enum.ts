export type ConditionImmunity = Condition;
// https://stackoverflow.com/questions/41179474/use-object-in-typescript-enum

export enum Condition {
    Blinded = 'Blinded',
    Charmed = 'Charmed',
    Deafened = 'Deafened',
    Exhaustion = 'Exhaustion',
    Frightened = 'Frightened',
    Grappled = 'Grappled',
    Paralyzed = 'Paralyzed',
    Petrified = 'Petrified',
    Poisoned = 'Poisoned',
    Prone = 'Prone',
    Restrained = 'Restrained',
    Stunned = 'Stunned',
    Unconscious = 'Unconscious'
}

export enum abilityAbbreviations {
    Wis = 'WIS',
    Dex = 'DEX',
    Cha = 'CHA',
    Int = 'INT',
    Str = 'STR',
    Con = 'CON'
}
