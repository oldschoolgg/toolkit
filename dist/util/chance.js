"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPercentChance = convertPercentChance;
exports.gaussianRandom = gaussianRandom;
exports.perTimeUnitChance = perTimeUnitChance;
const e_1 = require("e");
function convertPercentChance(percent) {
    return (1 / (percent / 100)).toFixed(1);
}
function gaussianRand(rolls = 3) {
    let rand = 0;
    for (let i = 0; i < rolls; i += 1) {
        rand += Math.random();
    }
    return rand / rolls;
}
function gaussianRandom(min, max, rolls) {
    return Math.floor(min + gaussianRand(rolls) * (max - min + 1));
}
function perTimeUnitChance(durationMilliseconds, oneInXPerTimeUnitChance, timeUnitInMilliseconds, successFunction) {
    const unitsPassed = Math.floor(durationMilliseconds / timeUnitInMilliseconds);
    const perUnitChance = oneInXPerTimeUnitChance / (timeUnitInMilliseconds / 60000);
    for (let i = 0; i < unitsPassed; i++) {
        if ((0, e_1.roll)(perUnitChance)) {
            successFunction();
        }
    }
}
//# sourceMappingURL=chance.js.map