"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const expressionParser_1 = require("../src/util/expressionParser");
(0, vitest_1.test)('evalMathExpression.test', () => {
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('10')).toEqual(10);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('10k')).toEqual(10000);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('0')).toEqual(0);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('25.2k')).toEqual(25200);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('10*10')).toEqual(100);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('1m')).toEqual(1000000);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('1b')).toEqual(1000000000);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('e*e*e*e*100b*100b')).toEqual(null);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('!9999999')).toEqual(null);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('9999999!')).toEqual(null);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('P99999')).toEqual(null);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('Sigma 99999')).toEqual(null);
    (0, vitest_1.expect)((0, expressionParser_1.evalMathExpression)('')).toEqual(null);
});
//# sourceMappingURL=evalMathExpression.test.js.map