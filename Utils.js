function isArray(obj) {
    return !!obj && obj.constructor === Array;
}

function removeDataFromArray(arr, data) {
    return arr.filter(elem => elem.id !== data.id);
}
