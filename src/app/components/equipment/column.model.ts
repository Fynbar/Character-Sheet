import { splitByCapital } from 'src/app/common/string.functions';
interface Column {
    field: string;
    header: string;
}

export type Columns = Column[];

export function generateCols(keys: string[]): Columns {
    return keys.map(k => ({
        field: k,
        header: `${k[0]}${splitByCapital(k).join(' ').slice(1)}`
    }));
}

export function generateFieldHTML(cols: Columns): string { return cols.map(c => `<td>{{rowData.${c.field}}}</td>`).join('\n'); }

export function generateHeaderHTML(cols: Columns): string { return cols.map(c => `<th>${c.header}</th>`).join('\n'); }
