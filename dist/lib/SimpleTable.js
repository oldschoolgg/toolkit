"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleTable = void 0;
const e_1 = require("e");
class SimpleTable {
    constructor() {
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "table", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "totalWeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.table = [];
        this.length = 0;
        this.totalWeight = 0;
    }
    add(item, weight = 1) {
        this.length += 1;
        this.totalWeight += weight;
        this.table.push({
            item,
            weight
        });
        return this;
    }
    delete(item) {
        const tableItem = this.table.find(_tableItem => _tableItem.item === item);
        if (!tableItem) {
            throw new Error(`${item} doesn't exist in this SimpleTable.`);
        }
        this.length -= 1;
        this.totalWeight -= tableItem.weight;
        this.table = this.table.filter(_item => _item !== tableItem);
        return this;
    }
    roll() {
        // Random number between 1 and the total weighting
        const randomWeight = (0, e_1.randInt)(1, this.totalWeight);
        // The index of the item that will be used.
        let result = -1;
        let weight = 0;
        for (let i = 0; i < this.table.length; i++) {
            const item = this.table[i];
            weight += item.weight;
            if (randomWeight <= weight) {
                result = i;
                break;
            }
        }
        const item = this.table[result]?.item ?? null;
        return item;
    }
    rollOrThrow() {
        const result = this.roll();
        if (result === null)
            throw new Error('Received null from SimpleTable, but expect not-null.');
        return result;
    }
}
exports.SimpleTable = SimpleTable;
//# sourceMappingURL=SimpleTable.js.map