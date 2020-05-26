export function stripArray(stringArray: string[]): string[] {
    const emptyArray = ['', ' '];
    // console.log(stringArray[stringArray.length - 1], stringArray[stringArray.length - 1] === '\s');
    if (emptyArray.indexOf(stringArray[0]) >= 0 || stringArray[0].length === 0) {
        stringArray = stringArray.splice(1);
        // } else if (emptyArray.indexOf(stringArray[stringArray.length - 1]) >= 0) {
        //   stringArray = stringArray.splice(-1);
    } else {
        return stringArray;
    }
    return stripArray(stringArray);
}

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

export function findBetweenStrings(bodyStr: string, strA: string, ...strsB: string[]) {

    let idx = strA === '' ? [0] : [bodyStr.toLowerCase().indexOf(strA.toLowerCase())];
    idx = idx.concat(strsB.map(strB => bodyStr.toLowerCase().indexOf(strB.toLowerCase())));
    let s = '';
    // console.log(idx);
    const len = idx.map(o => o - idx[0] - strA.length).filter(f => f > 0);
    // console.log(idx[0] >= 0 && len.length > 0, len);
    if (idx[0] >= 0 && len.length > 0) {
        // console.log(bodyStr[idx[0] + strA.length], Math.min(...len));
        s = bodyStr.substr(idx[0] + strA.length, Math.min(...len));
        // console.log(strA, ...strsB, s);
    }
    return s;
}

export function splitByCapital(str: string): string[] {
    return str.split(/(?=[A-Z])/);
}


