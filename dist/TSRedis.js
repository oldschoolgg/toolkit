"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const ioredis_mock_1 = __importDefault(require("ioredis-mock"));
const zod_1 = require("zod");
const newPatronMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('new_patron'),
    tier: zod_1.z.number().int()
});
const patronTierChangeMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('patron_tier_change'),
    new_tier: zod_1.z.number().int(),
    old_tier: zod_1.z.number().int(),
    discord_id: zod_1.z.string()
});
const pingMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('ping')
});
const messageSchema = zod_1.z.union([newPatronMessageSchema, pingMessageSchema, patronTierChangeMessageSchema]);
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
    subscribe(callback) {
        this.redis.subscribe(CHANNEL_ID, (err, count) => {
            if (err) {
                console.error('Failed to subscribe: ', err);
            }
            else {
                console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
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