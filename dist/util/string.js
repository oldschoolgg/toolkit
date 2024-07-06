"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ellipsize = ellipsize;
exports.containsBlacklistedWord = containsBlacklistedWord;
const node_fs_1 = require("node:fs");
function ellipsize(str, maxLen = 2000) {
    if (str.length > maxLen) {
        return `${str.substring(0, maxLen - 3)}...`;
    }
    return str;
}
const wordBlacklistBase64 = (0, node_fs_1.readFileSync)('./src/lib/wordBlacklist.txt', 'utf-8');
const wordBlacklist = Buffer.from(wordBlacklistBase64.trim(), 'base64')
    .toString('utf8')
    .split('\n')
    .map(word => word.trim().toLowerCase());
function containsBlacklistedWord(str) {
    const lowerCaseStr = str.toLowerCase();
    for (const word of wordBlacklist) {
        if (lowerCaseStr.includes(word)) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=string.js.map