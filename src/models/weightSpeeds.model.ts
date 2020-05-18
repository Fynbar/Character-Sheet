import { Normal } from './character.model';
export interface WeightSpeeds {
    normal: Normal;
    encumbered: null;
    heavilyEncumbered: null;
    pushDragLift: null;
    override: null;
}

export enum WeightSpeedEnum {
    normal = 1,
    encumbered = null,
    heavilyEncumbered = null,
    pushDragLift = null,
    override = null
}
