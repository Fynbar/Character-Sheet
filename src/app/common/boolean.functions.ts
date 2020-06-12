function allisNan(object, strs?: string[]) {
    if (!strs) {
        strs = Object.keys(object);
    }
    return strs.every(aa => isNaN(object[aa]));
}
export function someisNan(object, strs?: string[]) {
    if (!strs) {
        strs = Object.keys(object);
    }
    return strs.some(aa => isNaN(object[aa]));
}
