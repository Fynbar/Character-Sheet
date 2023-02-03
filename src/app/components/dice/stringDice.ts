export type SDice = SDie[]

export interface DiceHistory {
    [key: string]:{
        value:number;
        die:SDie;
        id:string
    }
}

export interface SDie {
    string:     string;
    diequant:   number;
    dienum:     number;
    sign:       Sign;
    subdice:    SDice;
    ignore:     number[];
    constant:   boolean;
    value:      number;
    ignoreRoll?: SDie;
    ignoreCond: string;
}

export enum Sign {
    plus= '+',
    minus= '-',
    mult= '*',
    div= '/',
    comp= ';',
    g = '>',
    ge = '>=',
    l = '<',
    le = '<=',
    e = '='
}
