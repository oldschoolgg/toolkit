"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyItem = modifyItem;
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
//# sourceMappingURL=osjs.js.map