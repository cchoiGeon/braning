export function calculateDaysSinceEpoch(date) {
    const MILLISECONDS_IN_A_DAY = 86400000;
    return (date / MILLISECONDS_IN_A_DAY) | 0;
}

export function calculateConsecutiveDays(lastSigninInDays, nowInDays, currentConsecution) {
    const MAX_DAYS_BETWEEN_LOGINS = 2;
    const diffDate = nowInDays - lastSigninInDays;
    return diffDate < MAX_DAYS_BETWEEN_LOGINS ? currentConsecution + diffDate : 1;
}