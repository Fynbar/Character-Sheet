export type ConditionImmunity = Condition ;
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

export enum DamageStatusType {
    Acid = 'Acid',
    // Blinded = 'Blinded',
    Bludgeoning = 'Bludgeoning',
    // Charmed = 'Charmed',
    Cold = 'Cold',
    // Deafened = 'Deafened',
    // Exhaustion = 'Exhaustion',
    Fire = 'Fire',
    // Frightened = 'Frightened',
    // Grappled = 'Grappled',
    Lightning = 'Lightning',
    Necrotic = 'Necrotic',
    // Paralyzed = 'Paralyzed',
    // Petrified = 'Petrified',
    Piercing = 'Piercing',
    Poison = 'Poison',
    // Poisoned = 'Poisoned',
    // Prone = 'Prone',
    Psychic = 'Psychic',
    Radiant = 'Radiant',
    // Restrained = 'Restrained',
    Slashing = 'Slashing',
    // Stunned = 'Stunned',
    Thunder = 'Thunder',
    // Unconscious = 'Unconscious',
}

export enum abilityAbbreviations {
    Wis = 'WIS',
    Dex = 'DEX',
    Cha = 'CHA',
    Int = 'INT',
    Str = 'STR',
    Con = 'CON'
}
