"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
class UserError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.UserError = UserError;
//# sourceMappingURL=UserError.js.map