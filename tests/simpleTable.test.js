"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const src_1 = require("../src");
(0, vitest_1.test)('SimpleTable', () => {
    const table = new src_1.SimpleTable();
    (0, vitest_1.expect)(table.table).toEqual([]);
    (0, vitest_1.expect)(table.totalWeight).toEqual(0);
    (0, vitest_1.expect)(table.roll()).toEqual(null);
    (0, vitest_1.expect)(() => table.rollOrThrow()).toThrow();
    (0, vitest_1.expect)(table.add('X', 1)).toEqual(table);
    (0, vitest_1.expect)(table.table).toEqual([{ item: 'X', weight: 1 }]);
    (0, vitest_1.expect)(table.totalWeight).toEqual(1);
    (0, vitest_1.expect)(table.roll()).toEqual('X');
    (0, vitest_1.expect)(table.rollOrThrow()).toEqual('X');
    table.delete('X');
    (0, vitest_1.expect)(table.roll()).toEqual(null);
    (0, vitest_1.expect)(() => table.delete('X')).toThrow();
});
//# sourceMappingURL=simpleTable.test.js.map