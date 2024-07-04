"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyItem = modifyItem;
exports.sanitizeBank = sanitizeBank;
exports.getItem = getItem;
const deepmerge_1 = __importDefault(require("deepmerge"));
const oldschooljs_1 = require("oldschooljs");
function modifyItem(itemName, data) {
    if (data.id)
        throw new Error('Cannot change item ID');
    const item = oldschooljs_1.Items.get(itemName);
    if (!item)
        throw new Error(`Item ${itemName} does not exist`);
    oldschooljs_1.Items.set(item.id, (0, deepmerge_1.default)(item, data));
}
function sanitizeBank(bank) {
    for (const [key, value] of Object.entries(bank.bank)) {
        if (value < 1) {
            delete bank.bank[key];
        }
        if (!Number.isInteger(value)) {
            bank.bank[key] = Math.floor(value);
        }
        const item = getItem(key);
        if (!item) {
            delete bank.bank[key];
        }
    }
    return bank;
}
function cleanItemName(itemName) {
    return itemName.replace(/’/g, "'");
}
function getItem(itemName) {
    if (itemName === undefined || !itemName)
        return null;
    let identifier = '';
    if (typeof itemName === 'number') {
        identifier = itemName;
    }
    else {
        const parsed = Number(itemName);
        identifier = Number.isNaN(parsed) ? cleanItemName(itemName) : parsed;
    }
    const item = oldschooljs_1.Items.get(identifier);
    return item ?? null;
}
//# sourceMappingURL=osjs.js.map