"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseBankQuantitesByPercent = increaseBankQuantitesByPercent;
exports.convertBankToPerHourStats = convertBankToPerHourStats;
exports.calcDropRatesFromBank = calcDropRatesFromBank;
exports.calcDropRatesFromBankWithoutUniques = calcDropRatesFromBankWithoutUniques;
exports.addBanks = addBanks;
exports.averageBank = averageBank;
exports.generateRandomBank = generateRandomBank;
const e_1 = require("e");
const oldschooljs_1 = require("oldschooljs");
function increaseBankQuantitesByPercent(bank, percent, whitelist = null) {
    for (const [item, qty] of bank.items()) {
        if (whitelist !== null && !whitelist.includes(item.id))
            continue;
        const increased = Math.floor((0, e_1.increaseNumByPercent)(qty, percent));
        bank.set(item.id, increased);
    }
}
function convertBankToPerHourStats(bank, time) {
    const result = [];
    for (const [item, qty] of bank.items()) {
        result.push(`${(qty / (time / e_1.Time.Hour)).toFixed(1)}/hr ${item.name}`);
    }
    return result;
}
function calcDropRatesFromBank(bank, iterations, uniques) {
    const result = [];
    let uniquesReceived = 0;
    for (const [item, qty] of bank.items().sort((a, b) => a[1] - b[1])) {
        if (uniques.includes(item.id)) {
            uniquesReceived += qty;
        }
        const rate = Math.round(iterations / qty);
        if (rate < 2)
            continue;
        let { name } = item;
        if (uniques.includes(item.id))
            name = `**${name}**`;
        result.push(`${qty}x ${name} (1 in ${rate})`);
    }
    result.push(`\n**${uniquesReceived}x Uniques (1 in ${Math.round(iterations / uniquesReceived)} which is ${(0, e_1.calcWhatPercent)(uniquesReceived, iterations)}%)**`);
    return result.join(', ');
}
function calcDropRatesFromBankWithoutUniques(bank, iterations) {
    const results = [];
    for (const [item, qty] of bank.items().sort((a, b) => a[1] - b[1])) {
        const rate = Math.round(iterations / qty);
        if (rate < 2)
            continue;
        results.push(`${qty}x ${item.name} (1 in ${rate})`);
    }
    return results;
}
function addBanks(banks) {
    const bank = new oldschooljs_1.Bank();
    for (const _bank of banks) {
        bank.add(_bank);
    }
    return bank;
}
function averageBank(bank, kc) {
    const newBank = new oldschooljs_1.Bank();
    for (const [item, qty] of bank.items()) {
        newBank.add(item.id, Math.floor(qty / kc));
    }
    return newBank;
}
function generateRandomBank(size = 100, amountPerItem = 10000) {
    const bank = new oldschooljs_1.Bank();
    for (let i = 0; i < size; i++) {
        bank.add(oldschooljs_1.Items.random().id, amountPerItem);
    }
    return bank;
}
//# sourceMappingURL=bank.js.map