export interface ToolsMonster {
    monster: MonsterElement[];
    _meta?: Meta;
    spell?: SpellElement[];
}

export interface Meta {
    sources?: SourceClass[];
    dateAdded?: number;
    dateLastModified?: number;
    dependencies?: Dependencies;
    internalCopies?: string[];
    otherSources?: OtherSources;
}

export interface Dependencies {
    monster: DMGElement[];
}

export enum DMGElement {
    Bgdia = 'BGDIA',
    Mm = 'MM',
    MonsterManualExpanded2 = 'MonsterManualExpanded2',
    Mtf = 'MTF',
    Skt = 'SKT',
    Vgm = 'VGM',
}

export interface OtherSources {
    monster: OtherSourcesMonster;
}

export interface OtherSourcesMonster {
    MM: DMGElement;
    ToA: DMGElement;
    MTF: DMGElement;
    VGM: DMGElement;
    RoT: DMGElement;
    DMG: DMGElement;
}

export interface SourceClass {
    json: DMGElement;
    abbreviation: string;
    full: string;
    version: string;
    url: string;
    authors: string[];
    convertedBy: string[];
    color: string;
}

export interface MonsterElement {
    name: string;
    source: DMGElement;
    page: number;
    otherSources?: Source[];
    size?: Size;
    type?: TypeClass | TypeTypeEnum;
    alignment?: Array<AlignmentClass | AlignmentEnum>;
    ac?: Array<ACClass | number>;
    hp?: HP;
    speed?: Speed;
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
    skill?: Skill;
    passive?: number;
    languages?: string[];
    cr?: CRClass | string;
    trait?: TraitElement[];
    action?: TraitElement[];
    environment?: Environment[];
    hasToken?: boolean;
    soundClip?: SoundClip;
    languageTags?: LanguageTag[];
    damageTags?: DamageTag[];
    miscTags?: MiscTag[];
    hasFluff?: boolean;
    hasFluffImages?: boolean;
    srd?: boolean;
    save?: Save;
    senses?: string[];
    legendary?: Legendary[];
    legendaryGroup?: LegendaryGroup;
    traitTags?: string[];
    senseTags?: SenseTag[];
    actionTags?: ActionTag[];
    conditionInflict?: ConditionImmune[];
    conditionInflictLegendary?: ConditionImmune[];
    immune?: Array<ImmuneClass | ImmuneEnum>;
    spellcasting?: Spellcasting[];
    spellcastingTags?: SpellcastingTag[];
    group?: string;
    dragonCastingColor?: string;
    resist?: Array<ResistClass | DamageInflict>;
    conditionImmune?: ConditionImmune[];
    conditionInflictSpell?: ConditionImmune[];
    variant?: Variant[];
    altArt?: AltArt[];
    vulnerable?: Array<VulnerableClass | DamageInflict>;
    reaction?: Legendary[];
    familiar?: boolean;
    legendaryHeader?: string[];
    alias?: string[];
    conditionInflicted?: ConditionImmune[];
    tokenUrl?: string;
    fluff?: Fluff;
    legendaryActions?: number;
    shortName?: string;
    _copy?: Copy;
    isNamedCreature?: boolean;
    isNpc?: boolean;
}

export interface Copy {
    name: string;
    source: DMGElement;
    _trait?: LegendaryGroup;
    _mod?: Mod;
}

export interface Mod {
    '*'?: Element[] | Element;
    trait?: Trait;
    action?: ActionAction[] | ActionAction;
    _?: Purple[] | Fluffy;
}

export interface Element {
    mode: Mode;
    replace: string;
    with: string;
    flags?: Flags;
}

export enum Flags {
    I = 'i',
}

export enum Mode {
    ReplaceTxt = 'replaceTxt',
}

export interface Purple {
    mode: string;
    skills: Skills;
}

export interface Skills {
    investigation: number;
}

export interface Fluffy {
    mode: string;
    spells: Spells;
}

export interface Spells {
    '7': The7[];
}

export interface The7 {
    replace: string;
    with: string;
}

export interface ActionAction {
    mode: string;
    replace?: string;
    items: Legendary;
}

export interface Legendary {
    name: string;
    entries: string[];
}

export interface Trait {
    mode: string;
    items: ItemsItem[] | Legendary;
}

export interface ItemsItem {
    name: string;
    entries: Array<PurpleEntry | string>;
}

export interface PurpleEntry {
    type: EntryType;
    items: string[];
}

export enum EntryType {
    Entries = 'entries',
    List = 'list',
    Spellcasting = 'spellcasting',
    Table = 'table',
}

export interface LegendaryGroup {
    name: string;
    source: LegendaryGroupSource;
}

export enum LegendaryGroupSource {
    Dmg = 'DMG',
    Mm = 'MM',
    Mtf = 'MTF',
    Phb = 'PHB',
    Vgm = 'VGM',
}

export interface ACClass {
    ac: number;
    from?: string[];
    condition?: string;
    braces?: boolean;
}

export interface TraitElement {
    name: string;
    entries: Array<FluffyEntry | string>;
}

export interface FluffyEntry {
    type: EntryType;
    style?: EntryStyle;
    items: Array<ItemItem | string>;
}

export interface ItemItem {
    type: ItemType;
    name: string;
    entry?: string;
    style?: ItemStyle;
    entries?: string[];
}

export enum ItemStyle {
    Italic = 'italic',
}

export enum ItemType {
    Item = 'item',
}

export enum EntryStyle {
    ListDecimal = 'list-decimal',
    ListHangNotitle = 'list-hang-notitle',
}

export enum ActionTag {
    FrightfulPresence = 'Frightful Presence',
    Multiattack = 'Multiattack',
    Parry = 'Parry',
    Swallow = 'Swallow',
    Teleport = 'Teleport',
    Tentacles = 'Tentacles',
}

export interface AlignmentClass {
    alignment?: AlignmentEnum[];
    chance?: number;
    special?: string;
}

export enum AlignmentEnum {
    A = 'A',
    C = 'C',
    E = 'E',
    G = 'G',
    L = 'L',
    N = 'N',
    Nx = 'NX',
    Ny = 'NY',
    U = 'U',
}

export interface AltArt {
    name: string;
    source: AltArtSource;
    page?: number;
}

export enum AltArtSource {
    Bgdia = 'BGDIA',
    CM = 'CM',
    CoS = 'CoS',
    DIP = 'DIP',
    Dc = 'DC',
    Egw = 'EGW',
    Erlw = 'ERLW',
    GoS = 'GoS',
    HftT = 'HftT',
    HotDQ = 'HotDQ',
    IDRotF = 'IDRotF',
    Imr = 'IMR',
    LMoP = 'LMoP',
    Lr = 'LR',
    Mm = 'MM',
    Mot = 'MOT',
    Mtf = 'MTF',
    OotA = 'OotA',
    PotA = 'PotA',
    Rmbre = 'RMBRE',
    RoT = 'RoT',
    Sdw = 'SDW',
    Skt = 'SKT',
    Slw = 'SLW',
    TFTYP = 'TftYP',
    Tce = 'TCE',
    ToA = 'ToA',
    Ttp = 'TTP',
    Wdh = 'WDH',
    Wdmm = 'WDMM',
}

export enum ConditionImmune {
    Blinded = 'blinded',
    Charmed = 'charmed',
    Deafened = 'deafened',
    Exhaustion = 'exhaustion',
    Frightened = 'frightened',
    Grappled = 'grappled',
    Incapacitated = 'incapacitated',
    Invisible = 'invisible',
    Paralyzed = 'paralyzed',
    Petrified = 'petrified',
    Poisoned = 'poisoned',
    Prone = 'prone',
    Restrained = 'restrained',
    Stunned = 'stunned',
    Unconscious = 'unconscious',
}

export interface CRClass {
    cr: string;
    lair?: string;
    coven?: string;
}

export enum DamageTag {
    A = 'A',
    B = 'B',
    C = 'C',
    F = 'F',
    I = 'I',
    L = 'L',
    N = 'N',
    O = 'O',
    P = 'P',
    R = 'R',
    S = 'S',
    T = 'T',
    Y = 'Y',
}

export enum Environment {
    Arctic = 'arctic',
    Coastal = 'coastal',
    Desert = 'desert',
    Forest = 'forest',
    Grassland = 'grassland',
    Hill = 'hill',
    Mountain = 'mountain',
    Swamp = 'swamp',
    Underdark = 'underdark',
    Underwater = 'underwater',
    Urban = 'urban',
}

export interface Fluff {
    images: Image[];
}

export interface Image {
    type: ImageType;
    href: Href;
}

export interface Href {
    type: HrefType;
    url: string;
}

export enum HrefType {
    External = 'external',
}

export enum ImageType {
    Image = 'image',
}

export interface HP {
    average?: number;
    formula?: string;
    special?: string;
}

export interface ImmuneClass {
    immune: DamageInflict[];
    note: ImmuneNote;
    cond: boolean;
}

export enum DamageInflict {
    Acid = 'acid',
    Bludgeoning = 'bludgeoning',
    Cold = 'cold',
    Fire = 'fire',
    FireLightning = 'fire lightning',
    Lightning = 'lightning',
    Necrotic = 'necrotic',
    Piercing = 'piercing',
    Poison = 'poison',
    Psychic = 'psychic',
    Radiant = 'radiant',
    Slashing = 'slashing',
    SlashingDamage = 'slashing damage',
    SlashingWhileInDimLightOrDarkness = 'slashing while in dim light or darkness',
    Thunder = 'thunder',
}

export enum ImmuneNote {
    FromNonmagicalAttacks = 'from nonmagical attacks',
    FromNonmagicalAttacksNotMadeWithSilveredWeapons = 'from nonmagical attacks not made with silvered weapons',
    FromNonmagicalAttacksThatArenTAdamantine = 'from nonmagical attacks that aren\'t adamantine',
    FromNonmagicalAttacksThatArenTAdamantineOrSilvered = 'from nonmagical attacks that aren\'t adamantine or silvered',
    FromNonmagicalAttacksThatArenTSilvered = 'from nonmagical attacks that aren\'t silvered',
    FromNonmagicalWeaponsThatArenTSilvered = 'from nonmagical weapons that aren\'t silvered',
}

export enum ImmuneEnum {
    Acid = 'acid',
    Cold = 'cold',
    Fire = 'fire',
    Force = 'force',
    Lightning = 'lightning',
    Necrotic = 'necrotic',
    Poison = 'poison',
    Psychic = 'psychic',
    Radiant = 'radiant',
    Slashing = 'slashing',
    Thunder = 'thunder',
}

export enum LanguageTag {
    Ab = 'AB',
    Aq = 'AQ',
    Au = 'AU',
    C = 'C',
    CS = 'CS',
    Ce = 'CE',
    D = 'D',
    DR = 'DR',
    Ds = 'DS',
    Du = 'DU',
    E = 'E',
    G = 'G',
    Gi = 'GI',
    Go = 'GO',
    Gth = 'GTH',
    H = 'H',
    I = 'I',
    Ig = 'IG',
    LF = 'LF',
    O = 'O',
    Oth = 'OTH',
    P = 'P',
    S = 'S',
    T = 'T',
    Tc = 'TC',
    Tp = 'TP',
    U = 'U',
    X = 'X',
    Xx = 'XX',
}

export enum MiscTag {
    Aoe = 'AOE',
    Mw = 'MW',
    Rch = 'RCH',
    Rng = 'RNG',
    Rw = 'RW',
    Thw = 'THW',
}

export interface Source {
    source: AltArtSource;
    page?: number;
}

export interface ResistClass {
    resist?: DamageInflict[];
    note?: ResistNote;
    cond?: boolean;
    special?: string;
    preNote?: string;
}

export enum ResistNote {
    FromMagicWeapons = 'from magic weapons',
    FromNonmagicalAttacks = 'from nonmagical attacks',
    FromNonmagicalAttacksNotMadeWithSilveredWeapons = 'from nonmagical attacks not made with silvered weapons',
    FromNonmagicalAttacksThatArenTAdamantine = 'from nonmagical attacks that aren\'t adamantine',
    FromNonmagicalAttacksThatArenTSilvered = 'from nonmagical attacks that aren\'t silvered',
    FromNonmagicalAttacksWhileInDimLightOrDarkness = 'from nonmagical attacks while in dim light or darkness',
    FromNonmagicalAttacksWhileInDimLightOrInDarkness = 'from nonmagical attacks while in dim light or in darkness',
    FromNonmagicalWeapons = 'from nonmagical weapons',
    FromStoneskin = '(from stoneskin)',
    WhileInDimLightOrDarkness = 'while in dim light or darkness',
}

export interface Save {
    con?: string;
    int?: string;
    wis?: string;
    dex?: string;
    cha?: string;
    str?: string;
}

export enum SenseTag {
    B = 'B',
    D = 'D',
    SD = 'SD',
    T = 'T',
    U = 'U',
}

export enum Size {
    G = 'G',
    H = 'H',
    L = 'L',
    M = 'M',
    S = 'S',
    T = 'T',
}

export interface Skill {
    perception?: string;
    history?: string;
    stealth?: string;
    medicine?: string;
    religion?: string;
    persuasion?: string;
    insight?: string;
    deception?: string;
    arcana?: string;
    athletics?: string;
    acrobatics?: string;
    survival?: string;
    intimidation?: string;
    investigation?: string;
    nature?: string;
    performance?: string;
    'sleight of hand'?: string;
    'perception+'?: string;
    'intimidation+'?: string;
    'arcana+'?: string;
    'animalhandling+'?: string;
    'arcana+9athletics'?: string;
    'arcana+8athletics'?: string;
    'animal handling'?: string;
    'survival+4conditionimmunties'?: ConditionImmune;
    'survival+6conditionimmunties'?: ConditionImmune;
    other?: Other[];
}

export interface Other {
    oneOf: OneOf;
}

export interface OneOf {
    arcana: string;
    history: string;
    nature: string;
    religion: string;
}

export interface SoundClip {
    type: SoundClipType;
    path: string;
}

export enum SoundClipType {
    Internal = 'internal',
}

export interface Speed {
    walk?: ClimbClass | number;
    fly?: ClimbClass | number;
    swim?: number;
    climb?: ClimbClass | number;
    burrow?: number;
    canHover?: boolean;
}

export interface ClimbClass {
    number: number;
    condition: string;
}

export interface Spellcasting {
    name: Name;
    headerEntries: string[];
    spells?: { [key: string]: SpellValue };
    ability?: Ability;
    will?: string[];
    hidden?: string[];
    footerEntries?: string[];
    daily?: SpellcastingDaily;
}

export enum Ability {
    Cha = 'cha',
    Int = 'int',
    Wis = 'wis',
}

export interface SpellcastingDaily {
    '1e'?: string[];
    '2e'?: string[];
    '1'?: string[];
    '3e'?: string[];
    '3'?: string[];
    '2'?: string[];
}

export enum Name {
    InnateSpellcasting = 'Innate Spellcasting',
    InnateSpellcasting1Day = 'Innate Spellcasting (1/Day)',
    InnateSpellcastingAbominationFormOnly = 'Innate Spellcasting (Abomination Form Only)',
    InnateSpellcastingAnathemaAscendantFormOnly = 'Innate Spellcasting (Anathema ascendant Form Only)',
    InnateSpellcastingAnathemaFormOnly = 'Innate Spellcasting (Anathema Form Only)',
    InnateSpellcastingPsionics = 'Innate Spellcasting (Psionics)',
    InnateSpellcastingYuanTIFormOnly = 'Innate Spellcasting (Yuan-ti Form Only)',
    NameInnateSpellcastingPsionics = 'Innate Spellcasting (psionics)',
    NameInnateSpellcastingYuanTIFormOnly = 'Innate Spellcasting (Yuan-Ti Form Only)',
    SharedSpellcastingCovenOnly = 'Shared Spellcasting (Coven Only)',
    Spellcasting = 'Spellcasting',
    SpellcastingLizardfolkFormOnly = 'Spellcasting (Lizardfolk Form Only)',
    SpellcastingYuanTIFormOnly = 'Spellcasting (Yuan-ti Form Only)',
    VariantDeathCoven = 'Variant: Death Coven',
    VariantNatureCoven = 'Variant: Nature Coven',
    VariantProphecyCoven = 'Variant: Prophecy Coven',
}

export interface SpellValue {
    spells: string[];
    slots?: number;
    lower?: number;
}

export enum SpellcastingTag {
    CD = 'CD',
    CR = 'CR',
    CS = 'CS',
    Cb = 'CB',
    Cc = 'CC',
    Cl = 'CL',
    Cp = 'CP',
    Cw = 'CW',
    F = 'F',
    I = 'I',
    P = 'P',
    S = 'S',
}

export interface TypeClass {
    type: TypeTypeEnum;
    tags?: string[];
    swarmSize?: DamageTag;
}

export enum TypeTypeEnum {
    Aberration = 'aberration',
    Beast = 'beast',
    Celestial = 'celestial',
    Construct = 'construct',
    Dragon = 'dragon',
    Dragonne = 'dragonne',
    Elemental = 'elemental',
    Fey = 'fey',
    Fiend = 'fiend',
    Giant = 'giant',
    Humanoid = 'humanoid',
    Monstrosity = 'monstrosity',
    Ogre = 'ogre',
    Ooze = 'ooze',
    Plant = 'plant',
    Undead = 'undead',
    Verbeeg = 'verbeeg',
}

export interface Variant {
    type: VariantType;
    name: string;
    entries: Array<TentacledEntry | string>;
    variantSource?: Source;
    token?: AltArt;
}

export interface TentacledEntry {
    name?: string;
    type: EntryType;
    entries?: Array<StickyEntry | string>;
    style?: EntryStyle;
    items?: Array<ItemItem | string>;
    headerEntries?: string[];
    will?: string[];
    daily?: EntryDaily;
    ability?: Ability;
    colLabels?: string[];
    colStyles?: string[];
    rows?: Array<string[]>;
    caption?: string;
}

export interface EntryDaily {
    '1': string[];
    '2e': string[];
}

export interface StickyEntry {
    type: string;
    name: string;
    entries: string[];
}

export enum VariantType {
    Inset = 'inset',
    Variant = 'variant',
}

export interface VulnerableClass {
    vulnerable: DamageInflict[];
    note: string;
    cond: boolean;
}

export interface SpellElement {
    name: string;
    source: DMGElement;
    page: number;
    level: number;
    school: string;
    time: Time[];
    range: Range;
    components: Components;
    duration: Duration[];
    entries: string[];
    savingThrow: string[];
    areaTags: string[];
    classes?: Classes;
    damageInflict?: DamageInflict[];
    conditionInflict?: ConditionImmune[];
    miscTags?: string[];
}

export interface Classes {
    fromClassList: LegendaryGroup[];
}

export interface Components {
    v: boolean;
    s: boolean;
    m?: M;
}

export interface M {
    text: string;
    cost: number;
}

export interface Duration {
    concentration: boolean;
    type: string;
    duration: Distance;
}

export interface Distance {
    amount?: number;
    type: string;
}

export interface Range {
    type: string;
    distance: Distance;
}

export interface Time {
    number: number;
    unit: string;
}
