export function isArray(obj) {
    return !!obj && obj.constructor === Array;
}

export function removeDataFromArray(arr, data) {
    return arr.filter(elem => elem.id !== data.id);
}
