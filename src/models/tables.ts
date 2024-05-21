import { SDie } from '../app/components/dice/stringDice';

export interface DiceTable {
    rows: DiceTableRow[];
    die: SDie;
    tableName: string;
    id: string;

}

export interface DiceTableRow {
    value:number;
    content:string;
    effect?:string;
}