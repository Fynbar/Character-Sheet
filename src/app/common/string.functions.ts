export function spaceJoin(strs: string[]): string {
    return strs.join(' ');
}
export function spaceSplit(str: string): string[] {
    return str.split(' ');
}

export function commaSplit(str: string): string[] {
    return str.split(', ');
}

export function insertString(mainStr: string, newStr: string, idx: number = 0): string {
    return mainStr.slice(0, idx) + newStr + mainStr.slice(idx);
}

export function findBetweenStrings(bodyStr: string, strA: string, ...strsB: string[]): string {
    const idx = strA === '' ? [0] : [bodyStr.toLowerCase().indexOf(strA.toLowerCase())];
    for (const i in strsB) {
        if (strsB[i]) { idx.push(bodyStr.toLowerCase().indexOf(strsB[i].toLowerCase(), idx[0] + strA.length)); }
    }
    let s = '';
    const len = idx.map(o => o - idx[0] - strA.length).filter(f => f > 0);
    if (idx[0] >= 0 && len.length > 0) {
        s = bodyStr.substr(idx[0] + strA.length, Math.min(...len));
    }
    return s;
}

export function splitByCapital(str: string): string[] {
    return str.split(/(?=[A-Z])/);
}

export function isIn(mainStr: string, ...subStr): boolean {
    return subStr.every(e => mainStr.toLowerCase().indexOf(e.toLowerCase()) >= 0);
}

export function cap(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function capEach(str: string): string {
    return breakBySubstrings(str, ' ').map(s => cap(s)).join(' ');
}

export function breakBySubstrings(bodyStr: string, ...strs: string[]): string[] {
    const idx = [];
    for (const i in strs) {
        if (strs[i]) {
            idx.push(
                i === '0' ?
                    bodyStr.toLowerCase().indexOf(strs[i].toLowerCase()) :
                    bodyStr.toLowerCase().indexOf(strs[i].toLowerCase(), idx[Number(i) - 1] + strs[Number(i) - 1].length)
            );
        }
    }
    let s = [];
    const len = idx.filter(f => f > 0);
    s = [bodyStr.substr(0, Math.min(...len))].concat(...len
        .map((k, i) => i === len.length - 1 ? bodyStr.substr(k) : bodyStr.substring(k, len[i + 1])));
    return s;
}

export function getAllNumbersInString(k: string): number[] {
    return k.split('').map(f => Number(f)).filter(f => !isNaN(f) && f > 0).map(n => Number(n));
}

export function sortFunction(a: string | number, b: string | number) {
    return a < b ? -1 : 1;
}

export function propertizeName(str: string): string {
    return spaceSplit(str).map((s, i) => i === 0 ? s.toLowerCase() : cap(s.toLowerCase())).join('');
}
