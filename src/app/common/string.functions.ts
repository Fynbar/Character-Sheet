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
    // const strings = [strA].concat(...strsB);
    const idx = strA === '' ? [0] : [bodyStr.toLowerCase().indexOf(strA.toLowerCase())];
    for (const i in strsB) {
        if (strsB[i]) {
            idx.push(bodyStr.toLowerCase().indexOf(strsB[i].toLowerCase(), idx[0] + strA.length));
        }
    }
    let s = '';

    const len = idx.map(o => o - idx[0] - strA.length).filter(f => f > 0);
    // if (strA.toUpperCase() === 'DC') {
    //     console.log(strA, strA.length);
    //     console.log(idx, len, bodyStr.substr(idx[0]));
    //     console.log(bodyStr.substring(idx[0], idx[0] + strA.length));
    // }
    // console.log(idx[0] >= 0 && len.length > 0, len);
    if (idx[0] >= 0 && len.length > 0) {
        s = bodyStr.substr(idx[0] + strA.length, Math.min(...len));
        // if (strA.toUpperCase().trim() === 'DC ') {
        //     console.log(bodyStr[idx[0] + strA.length], Math.min(...len));
        //     console.log(strA, ...strsB, s);
        // }
    }
    return s;
}

export function splitByCapital(str: string): string[] {
    return str.split(/(?=[A-Z])/);
}


