import { Item } from './equipment.model';
export interface Tools extends Item {
    toolCategory: ToolCategory;
    desc: string[];
}

export enum ToolCategory {
    ArtisanSTools = 'Artisan\'s Tools',
    GamingSets = 'Gaming Sets',
    MusicalInstrument = 'Musical Instrument',
    OtherTools = 'Other Tools'
}
