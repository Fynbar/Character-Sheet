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
export function stripString(str: string): string {
    if (str.length === 0) {
        return str;
    }
    if (str.indexOf(' ') === 0) {
        str = str.substring(1);
    } else if (str.indexOf(' ', str.length - 2) === str.length - 1) {
        str = str.substring(0, str.length - 1);
    } else {
        return str;
    }
    return stripString(str);
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
