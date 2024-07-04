"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSRedis = void 0;
const zod_1 = require("zod");
const patronUpdateMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('text'),
    text: zod_1.z.string(),
    channel: zod_1.z.enum(['main'])
});
const pingMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('ping'),
    channel: zod_1.z.enum(['main'])
});
const messageSchema = zod_1.z.union([patronUpdateMessageSchema, pingMessageSchema]);
class TSRedis {
    constructor(redis) {
        Object.defineProperty(this, "redis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.redis = redis;
    }
    subscribe(channel, callback) {
        this.redis.subscribe(channel, (err, count) => {
            if (err) {
                console.error('Failed to subscribe: ', err);
            }
            else {
                console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
            }
        });
        this.redis.on('message', (receivedChannel, message) => {
            if (receivedChannel === channel) {
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
        this.redis.publish(parsedMessage.channel, JSON.stringify(parsedMessage));
    }
}
exports.TSRedis = TSRedis;
//# sourceMappingURL=TSRedis.js.map