"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHexColorForCashStack = generateHexColorForCashStack;
exports.formatItemStackQuantity = formatItemStackQuantity;
function generateHexColorForCashStack(coins) {
    if (coins > 9999999) {
        return '#00FF80';
    }
    if (coins > 99999) {
        return '#FFFFFF';
    }
    return '#FFFF00';
}
function formatItemStackQuantity(quantity) {
    if (quantity > 9999999) {
        return `${Math.floor(quantity / 1000000)}M`;
    }
    else if (quantity > 99999) {
        return `${Math.floor(quantity / 1000)}K`;
    }
    return quantity.toString();
}
//# sourceMappingURL=runescape.js.map