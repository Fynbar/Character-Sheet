export function enumKeysArray(E) {
    return Object.keys(E).filter(k => typeof E[k as any] === 'number');
} // ['A', 'B']}

export function enumValuesArray(E) {
    return enumKeysArray(E).map(k => E[k as any]);
}
