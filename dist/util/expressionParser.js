"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalMathExpression = evalMathExpression;
const math_expression_evaluator_1 = __importDefault(require("math-expression-evaluator"));
const kmbTokens = [
    ['b', 1000000000],
    ['m', 1000000],
    ['k', 1000]
];
for (const [char, amount] of kmbTokens) {
    math_expression_evaluator_1.default.addToken([
        {
            type: 7,
            token: char,
            show: char,
            value(a) {
                return a * amount;
            }
        }
    ]);
}
/* c8 ignore start */
math_expression_evaluator_1.default.addToken([
    {
        type: 2,
        token: '!',
        show: '!',
        value(a) {
            return a;
        }
    }
]);
math_expression_evaluator_1.default.addToken([
    {
        type: 2,
        token: 'P',
        show: 'P',
        value(a) {
            return a;
        }
    }
]);
math_expression_evaluator_1.default.addToken([
    {
        type: 2,
        token: 'Sigma',
        show: 'Sigma',
        value(a) {
            return a;
        }
    }
]);
/* c8 ignore stop */
function evalMathExpression(str) {
    try {
        const result = math_expression_evaluator_1.default.eval(str);
        const number = Number.parseInt(result);
        if (Number.isNaN(number) || !Number.isFinite(number))
            return null;
        return number;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=expressionParser.js.map