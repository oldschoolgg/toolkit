"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../src/index");
(0, vitest_1.test)('generateSnowflake generates a valid snowflake', () => {
    const snowflake = (0, index_1.randomSnowflake)();
    const snowflakeBigInt = BigInt(snowflake);
    const timestamp = Number(snowflakeBigInt >> 22n) + 1420070400000;
    const date = new Date(timestamp);
    const now = new Date();
    (0, vitest_1.expect)(date.getTime()).toBeLessThanOrEqual(now.getTime());
    (0, vitest_1.expect)(date.getFullYear()).toBeGreaterThanOrEqual(2015);
    const workerId = Number((snowflakeBigInt & (0x1fn << 17n)) >> 17n);
    (0, vitest_1.expect)(workerId).toBeGreaterThanOrEqual(0);
    (0, vitest_1.expect)(workerId).toBeLessThanOrEqual(31);
    const processId = Number((snowflakeBigInt & (0x1fn << 12n)) >> 12n);
    (0, vitest_1.expect)(processId).toBeGreaterThanOrEqual(0);
    (0, vitest_1.expect)(processId).toBeLessThanOrEqual(31);
    const increment = Number(snowflakeBigInt & 0xfffn);
    (0, vitest_1.expect)(increment).toBeGreaterThanOrEqual(0);
    (0, vitest_1.expect)(increment).toBeLessThanOrEqual(4095);
});
//# sourceMappingURL=discord.test.js.map