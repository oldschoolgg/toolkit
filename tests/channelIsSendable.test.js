"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const src_1 = require("../src");
(0, vitest_1.test)('channelIsSendable', () => {
    (0, vitest_1.expect)((0, src_1.channelIsSendable)(null)).toEqual(false);
});
//# sourceMappingURL=channelIsSendable.test.js.map