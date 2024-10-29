const MILLISECONDS_IN_A_DAY = 86400000;
const nowDate = Date.now();

export function calculateDaysSinceEpoch() {
    return (nowDate / MILLISECONDS_IN_A_DAY) | 0;
}

export function calculateConsecutiveDays(lastSigninInDays, nowInDays, currentConsecution) {
    const MAX_DAYS_BETWEEN_LOGINS = 2;
    const diffDate = nowInDays - lastSigninInDays;
    return diffDate < MAX_DAYS_BETWEEN_LOGINS ? currentConsecution + diffDate : 1;
}

export function calculateTodayMidnight() {
    const nowInDays = calculateDaysSinceEpoch(nowDate);
    return nowInDays * MILLISECONDS_IN_A_DAY;
}