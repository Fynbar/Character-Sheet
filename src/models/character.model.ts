import { Rarity } from './itemRarity.enum';
import { ItemFilterType } from './itemFilterType.enum';
import { WeightSpeeds } from './rules/weightSpeeds.model';

export interface Character {
    character: CharacterClass;
    characterConfiguration: CharacterConfiguration;
    characterData: CharacterData;
}

export interface CharacterClass {
    id: number;
    readonlyUrl: string;
    avatarUrl: string;
    frameAvatarUrl: string;
    backdropAvatarUrl: string;
    smallBackdropAvatarUrl: string;
    largeBackdropAvatarUrl: string;
    thumbnailBackdropAvatarUrl: string;
    defaultBackdrop: DefaultBackdrop;
    avatarId: number;
    frameAvatarId: null;
    backdropAvatarId: null;
    smallBackdropAvatarId: null;
    largeBackdropAvatarId: null;
    thumbnailAvatarId: null;
    themeColorId: number;
    themeColor: ThemeColor;
    name: string;
    socialName: string;
    gender: string;
    faith: string;
    age: number;
    hair: string;
    eyes: string;
    skin: string;
    height: string;
    weight: number;
    inspiration: boolean;
    baseHitPoints: number;
    bonusHitPoints: null;
    overrideHitPoints: null;
    removedHitPoints: number;
    temporaryHitPoints: number;
    currentXp: number;
    alignmentId: number;
    lifestyleId: number;
    stats: Stat[];
    bonusStats: Stat[];
    overrideStats: Stat[];
    background: CharacterBackground;
    race: CharacterRace;
    notes: Notes;
    traits: Traits;
    preferences: Preferences;
    lifestyle: null;
    inventory: Inventory[];
    currencies: Currencies;
    classes: CharacterClassClass[];
    feats: CharacterFeat[];
    customDefenseAdjustments: any[];
    customSenses: any[];
    customSpeeds: any[];
    customProficiencies: any[];
    spellDefenses: null;
    customActions: any[];
    characterValues: CharacterValue[];
    conditions: any[];
    deathSaves: DeathSaves;
    adjustmentXp: null;
    spellSlots: PactMagic[];
    pactMagic: PactMagic[];
    activeSourceCategories: number[];
    spells: CharacterSpells;
    options: Tions;
    choices: Choices;
    actions: Tions;
    modifiers: Modifiers;
    classSpells: ClassSpell[];
    customItems: any[];
    campaign: null;
    creatures: any[];
    vehicles: any[];
    components: any[];
}

export interface Tions {
    race: any[];
    class: FeatElement[];
    feat: FeatElement[];
}

export interface FeatElement {
    id: number;
    entityTypeId: number;
    limitedUse: ClassLimitedUse | null;
    name: string;
    description: null | string;
    snippet: string;
    abilityModifierStatId: null;
    onMissDescription: null | string;
    saveFailDescription: null | string;
    saveSuccessDescription: null | string;
    saveStatId: null;
    fixedSaveDc: null;
    attackTypeRange: null;
    actionType: number;
    attackSubtype: null;
    dice: null;
    value: null;
    damageTypeId: null;
    isMartialArts: boolean;
    isProficient: boolean;
    spellRangeType: null;
    displayAsAttack: boolean | null;
    range: FeatRange;
    activation: Activation;
    attackCustomData: AttackCustomData;
    componentId: number;
    componentTypeId: number;
}

export interface Activation {
    activationTime: number | null;
    activationType: number | null;
}

export interface AttackCustomData {
    name: null;
    notes: null;
    damageBonus: null;
    toHitBonus: null;
    toHit: null;
    isOffhand: null;
    isSilver: null;
    isAdamantine: null;
    isProficient: null;
    saveDcBonus: null;
    saveDc: null;
    weight: null;
    displayAsAttack: null;
    cost: null;
}

export interface ClassLimitedUse {
    name: null;
    statModifierUsesId: number | null;
    resetType: number;
    numberUsed: number;
    minNumberConsumed: number | null;
    maxNumberConsumed: number;
    maxUses: number;
    operator: number | null;
}

export interface FeatRange {
    range: number | null;
    longRange: null;
    aoeType: null;
    aoeSize: null;
    hasAoeSpecialDescription: boolean;
}

export interface CharacterBackground {
    hasCustomBackground: boolean;
    definition: DefinitionElement;
    customBackground: CustomBackground;
}

export interface CustomBackground {
    id: number;
    entityTypeId: number;
    name: string;
    description: string;
    featuresBackground: DefinitionElement;
    characteristicsBackground: DefinitionElement;
    backgroundType: number;
}

export interface DefinitionElement {
    id: number;
    entityTypeId: number;
    name: string;
    description: string;
    snippet: string;
    shortDescription: string;
    skillProficienciesDescription: string;
    toolProficienciesDescription: string;
    languagesDescription: string;
    equipmentDescription: string;
    featureName: string;
    featureDescription: string;
    avatarUrl: null;
    largeAvatarUrl: null;
    suggestedCharacteristicsDescription: string;
    suggestedProficiencies: string[];
    suggestedLanguages: any[];
    organization: null;
    contractsDescription: string;
    spellsPreDescription: string;
    spellsPostDescription: string;
    personalityTraits: Bond[];
    ideals: Bond[];
    bonds: Bond[];
    flaws: Bond[];
}

export interface Bond {
    id: number;
    description: string;
    diceRoll: number;
}

export interface Stat {
    id: number;
    name: null;
    value: number | null;
}

export interface CharacterValue {
    typeId: number;
    value: string;
    notes: null;
    valueId: number;
    valueTypeId: number;
    contextId: null;
    contextTypeId: null;
}

export interface Choices {
    race: any[];
    class: ChoicesBackground[];
    background: ChoicesBackground[];
    feat: any[];
}

export interface ChoicesBackground {
    id: string;
    parentChoiceId: null | string;
    type: number;
    subType: number | null;
    optionValue: number;
    label: null | string;
    isOptional: boolean;
    isInfinite: boolean;
    defaultSubtypes: string[];
    options: Option[];
    componentId: number;
    componentTypeId: number;
}

export interface Option {
    id: number;
    label: string;
    description: null | string;
}

export interface ClassSpell {
    entityTypeId: number;
    characterClassId: number;
    spells: Spell[];
}

export interface Spell {
    id: number;
    entityTypeId: number;
    definition: SpellDefinition;
    prepared: boolean;
    countsAsKnownSpell: boolean;
    usesSpellSlot: boolean;
    castAtLevel: null;
    alwaysPrepared: boolean;
    restriction: null;
    spellCastingAbilityId: null;
    displayAsAttack: null;
    additionalDescription: null;
    castOnlyAsRitual: boolean;
    ritualCastingType: null;
    range: DefinitionRange;
    activation: Activation;
    baseLevelAtWill: boolean;
    atWillLimitedUseLevel: null;
    componentId: number;
    componentTypeId: number;
}

export interface SpellDefinition {
    id: number;
    name: string;
    level: number;
    school: string;
    duration: Duration;
    activation: Activation;
    range: DefinitionRange;
    asPartOfWeaponAttack: boolean;
    description: string;
    snippet: string;
    concentration: boolean;
    ritual: boolean;
    rangeArea: null;
    damageEffect: null;
    components: number[];
    componentsDescription: string;
    saveDcAbilityId: number | null;
    healing: null | string;
    healingDice: null;
    tempHpDice: null;
    attackType: null;
    canCastAtHigherLevel: boolean;
    isHomebrew: boolean;
    version: null | string;
    sourceId: number | null;
    sourcePageNumber: number | null;
    requiresSavingThrow: boolean;
    requiresAttackRoll: boolean;
    atHigherLevels: AtHigherLevels;
    modifiers: Modifier[];
    conditions: Condition[];
    tags: string[];
    castingTimeDescription: string;
}

export interface AtHigherLevels {
    scaleType: ScaleType | null;
    higherLevelDefinitions: HigherLevelDefinition[];
    additionalAttacks: any[];
    additionalTargets: AdditionalTarget[];
    areaOfEffect: any[];
    duration: any[];
    creatures: any[];
    special: any[];
    points: Point[];
}

export interface AdditionalTarget {
    targets: number;
    level: number;
    description: string;
}

export interface HigherLevelDefinition {
    level: number | null;
    typeId: number;
    dice: Damage | null;
    value: number | null;
    details: Details;
}

export enum Details {
    Empty = '',
    SeeDescription = '(See Description)',
}

export interface Damage {
    diceCount: number | null;
    diceValue: number | null;
    diceMultiplier: number | null;
    fixedValue: number | null;
    diceString: null | string;
}

export interface Point {
    die: Damage;
    level: number;
    description: string;
}

export enum ScaleType {
    Characterlevel = 'characterlevel',
    Spellscale = 'spellscale',
}

export interface Condition {
    type: number;
    conditionId: number;
    conditionDuration: number;
    durationUnit: DurationUnit;
    exception: string;
}

export enum DurationUnit {
    Hour = 'Hour',
    Minute = 'Minute',
    Round = 'Round',
}

export interface Duration {
    durationInterval: number | null;
    durationUnit: DurationUnit | null;
    durationType: DurationType;
}

export enum DurationType {
    Concentration = 'Concentration',
    Instantaneous = 'Instantaneous',
    Time = 'Time',
}

export interface Modifier {
    id: string;
    type: Type;
    subType: string;
    die: Damage;
    count: number;
    duration: number;
    durationUnit: null;
    restriction: string;
    friendlyTypeName: FriendlyTypeName;
    friendlySubtypeName: string;
    usePrimaryStat: boolean;
    atHigherLevels: AtHigherLevels;
}

export enum FriendlyTypeName {
    Advantage = 'Advantage',
    Bonus = 'Bonus',
    Damage = 'Damage',
    Disadvantage = 'Disadvantage',
}

export enum Type {
    Advantage = 'advantage',
    Bonus = 'bonus',
    Damage = 'damage',
    Disadvantage = 'disadvantage',
}

export interface DefinitionRange {
    origin: Origin;
    rangeValue: number;
    aoeType: AoeType | null;
    aoeValue: number | null;
}

export enum AoeType {
    Cube = 'Cube',
    Sphere = 'Sphere',
}

export enum Origin {
    Ranged = 'Ranged',
    Self = 'Self',
    Touch = 'Touch',
    Unlimited = 'Unlimited',
}

export interface CharacterClassClass {
    id: number;
    entityTypeId: number;
    level: number;
    isStartingClass: boolean;
    hitDiceUsed: number;
    definition: Subclass;
    subclassDefinition: Subclass;
    classFeatures: ClassClassFeature[];
}

export interface ClassClassFeature {
    definition: ClassFeatureDefinition;
    levelScale: LevelScale | null;
}

export interface ClassFeatureDefinition {
    id: number;
    entityTypeId: number;
    displayOrder: number;
    name: string;
    description: string;
    snippet: string;
    activation: Activation;
    multiClassDescription: string;
    requiredLevel: number;
    isSubClassFeature: boolean;
    limitedUse: LimitedUseElement[];
    hideInBuilder: boolean;
    hideInSheet: boolean;
    sourceId: number | null;
    sourcePageNumber: number | null;
    creatureRules: any[];
    infusionRules: any[];
}

export interface LimitedUseElement {
    level: null;
    uses: number;
}

export interface LevelScale {
    id: number;
    level: number;
    description: string;
    dice: Damage | null;
    fixedValue: number | null;
}

export interface Subclass {
    id: number;
    name: string;
    description: string;
    equipmentDescription: null | string;
    parentClassId: number | null;
    avatarUrl: null | string;
    largeAvatarUrl: null | string;
    portraitAvatarUrl: null | string;
    moreDetailsUrl: string;
    spellCastingAbilityId: number;
    sourceIds: number[];
    hitDice: number;
    classFeatures: SubclassClassFeature[];
    wealthDice: Damage | null;
    canCastSpells: boolean;
    knowsAllSpells: boolean;
    spellPrepareType: null;
    spellContainerName: null;
    sourceId: number | null;
    sourcePageNumber: number | null;
    primaryAbilities: number[];
    spellRules: SpellRules | null;
    prerequisites: Prerequisite[] | null;
}

export interface SubclassClassFeature {
    id: number;
    name: string;
    prerequisite: null;
    description: string;
    requiredLevel: number;
    displayOrder: number;
}

export interface Prerequisite {
    description: string;
    prerequisiteMappings: PrerequisiteMapping[];
}

export interface PrerequisiteMapping {
    id: number;
    entityId: number | null;
    entityTypeId: number | null;
    type: string;
    subType: string;
    value: number | null;
    friendlyTypeName: string;
    friendlySubTypeName: string;
}

export interface SpellRules {
    multiClassSpellSlotDivisor: number;
    multiClassSpellSlotRounding: number;
    isRitualSpellCaster: boolean;
    levelCantripsKnownMaxes: number[];
    levelSpellKnownMaxes: number[];
    levelSpellSlots: Array<number[]>;
}

export interface Currencies {
    cp: number;
    sp: number;
    gp: number;
    ep: number;
    pp: number;
}

export interface DeathSaves {
    failCount: number;
    successCount: number;
    isStabilized: boolean;
}

export interface DefaultBackdrop {
    backdropAvatarUrl: string;
    smallBackdropAvatarUrl: string;
    largeBackdropAvatarUrl: string;
    thumbnailBackdropAvatarUrl: string;
}

export interface CharacterFeat {
    componentTypeId: number;
    componentId: number;
    definition: DefinitionClass;
}

export interface DefinitionClass {
    id: number;
    entityTypeId: number;
    name: string;
    description: string;
    snippet: null | string;
    activation: Activation;
    features?: null;
    sourceId: number | null;
    sourcePageNumber: number | null;
    creatureRules: any[];
    prerequisites?: Prerequisite[];
    displayOrder?: number;
    hideInBuilder?: boolean;
    hideInSheet?: boolean;
}

export interface Inventory {
    id: number;
    entityTypeId: number;
    definition: InventoryDefinition;
    quantity: number;
    isAttuned: boolean;
    equipped: boolean;
    limitedUse: null;
    displayAsAttack?: null;
}

export interface InventoryDefinition {
    baseItemId?: number;
    baseArmorName?: string;
    strengthRequirement?: null;
    armorClass?: number;
    stealthCheck?: number;
    armorTypeId?: number;
    id: number;
    baseTypeId: number;
    entityTypeId: number;
    canEquip: boolean;
    magic: boolean;
    name: string;
    snippet: null;
    weight: number;
    type: string;
    description: string;
    canAttune: boolean;
    attunementDescription: null;
    rarity: Rarity;
    isHomebrew: boolean;
    version: null;
    sourceId: null;
    sourcePageNumber: null;
    stackable: boolean;
    bundleSize: number;
    avatarUrl: null;
    largeAvatarUrl: null;
    filterType: ItemFilterType;
    cost: number;
    isPack: boolean;
    levelInfusionGranted: null;
    canBeAddedToInventory: boolean;
    groupedId: null;
    tags: string[];
    grantedModifiers: any[];
    damage?: Damage;
    damageType?: string;
    fixedDamage?: null;
    properties?: Property[];
    attackType?: number;
    categoryId?: number;
    range?: number;
    longRange?: number;
    isMonkWeapon?: boolean;
    weaponBehaviors?: any[];
    subType?: string;
    isConsumable?: boolean;
    gearTypeId?: number;
}

export interface Property {
    id: number;
    name: string;
    description: string;
    notes: null;
}

export interface Modifiers {
    race: RaceElement[];
    class: RaceElement[];
    background: RaceElement[];
    item: any[];
    feat: any[];
    condition: any[];
}

export interface RaceElement {
    id: string;
    entityId: number | null;
    entityTypeId: number | null;
    type: string;
    subType: string;
    dice: null;
    restriction: null | string;
    statId: null;
    requiresAttunement: boolean;
    duration: null;
    friendlyTypeName: string;
    friendlySubtypeName: string;
    isGranted: boolean;
    bonusTypes: any[];
    value: number | null;
    componentId: number;
    componentTypeId: number;
}

export interface Notes {
    allies: string;
    personalPossessions: string;
    otherHoldings: null;
    organizations: null;
    enemies: null;
    backstory: string;
    otherNotes: string;
}

export interface PactMagic {
    level: number;
    used: number;
    available: number;
}

export interface Preferences {
    useHomebrewContent: boolean;
    progressionType: number;
    encumbranceType: number;
    ignoreCoinWeight: boolean;
    hitPointType: number;
    showUnarmedStrike: boolean;
    showCompanions: boolean;
    showWildShape: boolean;
    primarySense: number;
    primaryMovement: number;
    privacyType: number;
    sharingType: number;
    abilityScoreDisplayType: number;
    enforceFeatRules: boolean;
    enforceMulticlassRules: boolean;
}

export interface CharacterRace {
    entityRaceId: number;
    entityRaceTypeId: number;
    fullName: string;
    baseRaceId: number;
    baseRaceTypeId: number;
    description: string;
    avatarUrl: string;
    largeAvatarUrl: string;
    portraitAvatarUrl: string;
    moreDetailsUrl: string;
    isHomebrew: boolean;
    sourceIds: number[];
    groupIds: number[];
    type: number;
    subRaceShortName: null;
    baseName: string;
    racialTraits: RacialTrait[];
    weightSpeeds: WeightSpeeds;
    featIds: any[];
    size: string;
    sizeId: number;
}

export interface RacialTrait {
    definition: DefinitionClass;
}

export interface Normal {
    walk: number;
    fly: number;
    burrow: number;
    swim: number;
    climb: number;
}

export interface CharacterSpells {
    race: SpellsRace[];
    class: SpellsClass[];
    item: any[];
    feat: any[];
}

export interface SpellsClass {
    overrideSaveDc: null;
    limitedUse: number;
    id: number;
    entityTypeId: number;
    definition: SpellDefinition;
    prepared: null;
    countsAsKnownSpell: boolean;
    usesSpellSlot: boolean;
    castAtLevel: null;
    alwaysPrepared: null;
    restriction: string;
    spellCastingAbilityId: null;
    displayAsAttack: boolean | null;
    additionalDescription: null | string;
    castOnlyAsRitual: boolean;
    ritualCastingType: null;
    range: DefinitionRange;
    activation: Activation;
    baseLevelAtWill: boolean;
    atWillLimitedUseLevel: null;
    componentId: number;
    componentTypeId: number;
}

export interface SpellsRace {
    overrideSaveDc: null;
    limitedUse: ClassLimitedUse | null;
    id: number;
    entityTypeId: number;
    definition: SpellDefinition;
    prepared: null;
    countsAsKnownSpell: boolean;
    usesSpellSlot: boolean;
    castAtLevel: number | null;
    alwaysPrepared: null;
    restriction: string;
    spellCastingAbilityId: number;
    displayAsAttack: boolean;
    additionalDescription: null;
    castOnlyAsRitual: boolean;
    ritualCastingType: null;
    range: DefinitionRange;
    activation: Activation;
    baseLevelAtWill: boolean;
    atWillLimitedUseLevel: null;
    componentId: number;
    componentTypeId: number;
}

export interface ThemeColor {
    themeColorId: number;
    themeColor: string;
    backgroundColor: BackgroundColor;
    name: string;
    raceId: null;
    subRaceId: null;
    classId: number;
    tags: ThemeColorTag[];
}

export enum BackgroundColor {
    Fefefe = '#FEFEFE',
}

export enum ThemeColorTag {
    ClassThemes = 'Class Themes',
}

export interface Traits {
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    appearance: null;
}

export interface CharacterConfiguration {
    startingEquipmentType: number;
    abilityScoreType: number;
    showHelpText: boolean;
}

export interface CharacterData {
    backgrounds: DefinitionElement[];
    feats: DefinitionClass[];
    portraits: Portrait[];
    frames: any[];
    backdrops: Backdrop[];
    themeColors: ThemeColor[];
    subclasses: Subclass[];
}

export interface Backdrop {
    id: number;
    name: string;
    backdropAvatarId: number;
    smallBackdropAvatarId: number;
    largeBackdropAvatarId: number;
    thumbnailBackdropAvatarId: number;
    backdropAvatarUrl: string;
    smallBackdropAvatarUrl: string;
    largeBackdropAvatarUrl: string;
    thumbnailBackdropAvatarUrl: string;
    raceId: null;
    subRaceId: null;
    classId: number;
    tags: BackdropTag[];
}

export enum BackdropTag {
    ClassBackdrops = 'Class Backdrops',
}

export interface Portrait {
    id: number;
    name: null | string;
    avatarId: number;
    avatarUrl: string;
    raceId: number | null;
    subRaceId: number | null;
    classId: null;
    tags: any[];
}
