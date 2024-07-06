"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncGzip = asyncGzip;
exports.md5sum = md5sum;
const node_crypto_1 = require("node:crypto");
const node_zlib_1 = require("node:zlib");
async function asyncGzip(buffer) {
    return new Promise((resolve, reject) => {
        (0, node_zlib_1.gzip)(buffer, {}, (error, gzipped) => {
            if (error) {
                reject(error);
            }
            resolve(gzipped);
        });
    });
}
function md5sum(str) {
    return (0, node_crypto_1.createHash)('md5').update(str).digest('hex');
}
//# sourceMappingURL=node.js.map