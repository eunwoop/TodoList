export function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const todayStr = yyyy + '-' + mm + '-' + dd;
    return todayStr;
}

export function getTomorrow() {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const tomorrow = yyyy + '-' + mm + '-' + dd;

    return tomorrow;
}

export function isToday(dateStr) {
    const today = getCurrentDate();
    dateStr = getDateString(dateStr);
    console.log(dateStr);
    return dateStr === today;
}

export function isTomorrow(dateStr) {
    const tomorrow = getTomorrow();
    dateStr = getDateString(dateStr);
    console.log(dateStr);
    return dateStr === tomorrow;
}

export function getDateString(dateStr) {
    if (dateStr === undefined || dateStr === null) {
        return '';
    }
    return dateStr.substring(0, 10);
}

export function getThisWeekDates() {
    let startOfWeek = moment().startOf('week').subtract(7, 'd');
    let thisWeekDay = [];
    for (let i = 0; i < 7; i++) {
        thisWeekDay.push(startOfWeek.add(1, 'd').format('YYYY-MM-DD'));
    }
    return thisWeekDay;
}