"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedShuffle = seedShuffle;
exports.seedShuffleMut = seedShuffleMut;
const pure_rand_1 = __importDefault(require("pure-rand"));
function fisherYates(data, rand) {
    for (let i = data.length - 1; i >= 1; --i) {
        const j = rand(0, i);
        [data[j], data[i]] = [data[i], data[j]];
    }
}
function parseSeed(str) {
    if (typeof str === 'number')
        return str;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
}
function seedShuffle(array, seedString) {
    const rng = pure_rand_1.default.xoroshiro128plus(parseSeed(seedString));
    const rand = (min, max) => {
        return pure_rand_1.default.unsafeUniformIntDistribution(min, max, rng);
    };
    const copy = [...array];
    fisherYates(copy, rand);
    return copy;
}
function seedShuffleMut(array, seedString) {
    const rng = pure_rand_1.default.xoroshiro128plus(parseSeed(seedString));
    const rand = (min, max) => {
        return pure_rand_1.default.unsafeUniformIntDistribution(min, max, rng);
    };
    fisherYates(array, rand);
}
//# sourceMappingURL=purerand.js.map