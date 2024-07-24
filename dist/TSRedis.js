"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const ioredis_mock_1 = __importDefault(require("ioredis-mock"));
const zod_1 = require("zod");
const patronTierChangeMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('patron_tier_change'),
    new_tier: zod_1.z.number().int(),
    old_tier: zod_1.z.number().int(),
    discord_ids: zod_1.z.array(zod_1.z.string()),
    first_time_patron: zod_1.z.boolean()
});
const pingMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('ping')
});
const messageSchema = zod_1.z.union([pingMessageSchema, patronTierChangeMessageSchema]);
const CHANNEL_ID = 'main';
class TSRedis {
    constructor(options = { mocked: false }) {
        Object.defineProperty(this, "redis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.redis = options.mocked ? new ioredis_mock_1.default(options) : new ioredis_1.default(options);
    }
    disconnect() {
        return this.redis.disconnect(false);
    }
    subscribe(callback) {
        this.redis.subscribe(CHANNEL_ID, err => {
            if (err) {
                console.error('Failed to subscribe: ', err);
            }
        });
        this.redis.on('message', (receivedChannel, message) => {
            if (receivedChannel === CHANNEL_ID) {
                try {
                    const parsedMessage = JSON.parse(message);
                    const validatedMessage = messageSchema.parse(parsedMessage);
                    callback(validatedMessage);
                }
                catch (error) {
                    console.error('Failed to parse message: ', error);
                }
            }
        });
    }
    publish(message) {
        const parsedMessage = messageSchema.parse(message);
        this.redis.publish(CHANNEL_ID, JSON.stringify(parsedMessage));
    }
}
exports.TSRedis = TSRedis;
//# sourceMappingURL=TSRedis.js.map