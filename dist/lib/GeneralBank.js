"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralBank = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
function assert(condition, desc) {
    if (!condition) {
        throw new Error(desc ?? 'Failed assertion');
    }
}
class GeneralBank {
    constructor({ allowedKeys, validator, initialBank, valueSchema } = {}) {
        Object.defineProperty(this, "bank", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "allowedKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "validator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "valueSchema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bank = initialBank ?? {};
        this.allowedKeys = allowedKeys ? new Set(allowedKeys) : undefined;
        this.validator = validator;
        this.valueSchema = valueSchema ?? { min: 1, max: Number.MAX_SAFE_INTEGER, floats: false };
        if (this.valueSchema.min < 0)
            throw new Error('Value schema min must be non-negative.');
        if (this.valueSchema.max < this.valueSchema.min)
            throw new Error('Value schema max must be greater than min.');
        this.validate();
    }
    get _bank() {
        return this.bank;
    }
    clone() {
        return new GeneralBank({
            allowedKeys: this.allowedKeys ? Array.from(this.allowedKeys) : undefined,
            validator: this.validator,
            initialBank: { ...this.bank },
            valueSchema: this.valueSchema
        });
    }
    validate() {
        for (let key of Object.keys(this.bank)) {
            const value = this.bank[key];
            if (this.allowedKeys) {
                if (typeof Array.from(this.allowedKeys.values())[0] === 'number') {
                    key = Number.parseInt(key);
                }
                if (!this.allowedKeys.has(key)) {
                    throw new Error(`Key ${key} (${typeof key}) is not allowed, only these are allowed: ${Array.from(this.allowedKeys).join(', ')}`);
                }
            }
            assert(typeof value === 'number' && value >= this.valueSchema.min && value <= this.valueSchema.max, `Invalid value (not within minmax ${this.valueSchema.min}-${this.valueSchema.max}) for ${key}: ${value}`);
            if (!this.valueSchema.floats) {
                assert(Number.isInteger(value), `Value for ${key} is not an integer: ${value}`);
            }
            this.validator?.(key, value, this.bank);
        }
    }
    entries() {
        return Object.entries(this.bank);
    }
    length() {
        return Object.keys(this.bank).length;
    }
    amount(key) {
        return this.bank[key] ?? 0;
    }
    has(key) {
        return this.amount(key) >= 1;
    }
    toString() {
        const entries = Object.entries(this.bank);
        if (entries.length === 0)
            return 'Bank is empty';
        return entries.map(([key, value]) => `${key}: ${value}`).join(', ');
    }
    addItem(key, quantity) {
        assert(quantity >= 0, 'Quantity must be non-negative.');
        const newValue = decimal_js_1.default.add(this.amount(key), quantity).toNumber();
        if (newValue > this.valueSchema.max) {
            throw new Error(`Value for ${key} exceeds the maximum of ${this.valueSchema.max}.`);
        }
        this.bank[key] = newValue;
        this.validate();
        return this;
    }
    removeItem(key, quantity) {
        assert(quantity >= 0, 'Quantity must be non-negative.');
        const currentAmount = this.amount(key);
        if (currentAmount < quantity) {
            throw new Error(`Not enough ${key} to remove.`);
        }
        const newValue = decimal_js_1.default.sub(currentAmount, quantity).toNumber();
        this.bank[key] = newValue;
        if (newValue === 0) {
            delete this.bank[key];
        }
        this.validate();
        return this;
    }
    add(keyOrBank, quantity = 1) {
        if (keyOrBank instanceof GeneralBank) {
            for (const [key, qty] of keyOrBank.entries()) {
                this.addItem(key, qty);
            }
        }
        else {
            this.addItem(keyOrBank, quantity);
        }
        return this;
    }
    remove(keyOrBank, quantity = 1) {
        if (keyOrBank instanceof GeneralBank) {
            for (const [key, qty] of Object.entries(keyOrBank.bank)) {
                this.removeItem(key, qty);
            }
        }
        else {
            this.removeItem(keyOrBank, quantity);
        }
        return this;
    }
}
exports.GeneralBank = GeneralBank;
//# sourceMappingURL=GeneralBank.js.map