"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAtleastThisOld = isAtleastThisOld;
exports.isWeekend = isWeekend;
exports.calcPerHour = calcPerHour;
exports.formatDuration = formatDuration;
const e_1 = require("e");
function isAtleastThisOld(date, expectedAgeInMS) {
    const difference = Date.now() - (typeof date === 'number' ? date : date.getTime());
    return difference >= expectedAgeInMS;
}
function isWeekend() {
    const currentDate = new Date(Date.now() - e_1.Time.Hour * 6);
    return [6, 0].includes(currentDate.getDay());
}
function calcPerHour(value, duration) {
    return (value / (duration / e_1.Time.Minute)) * 60;
}
function formatDuration(ms, short = false, precise = false) {
    if (ms < 0)
        ms = -ms;
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60
    };
    const shortTime = {
        d: Math.floor(ms / 86400000),
        h: Math.floor(ms / 3600000) % 24,
        m: Math.floor(ms / 60000) % 60,
        s: Math.floor(ms / 1000) % 60
    };
    const nums = Object.entries(short ? shortTime : time).filter(val => val[1] !== 0);
    if (nums.length === 0) {
        return precise ? `${ms}ms` : 'less than 1 second';
    }
    return nums
        .map(([key, val]) => `${val}${short ? '' : ' '}${key}${val === 1 || short ? '' : 's'}`)
        .join(short ? '' : ', ');
}
//# sourceMappingURL=datetime.js.map