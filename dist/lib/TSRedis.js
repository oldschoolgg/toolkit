"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSRedis = void 0;
const zod_1 = require("zod");
const messageBaseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    channel: zod_1.z.enum(['main'])
});
const textMessageSchema = messageBaseSchema.extend({
    type: zod_1.z.literal('text'),
    text: zod_1.z.string()
});
const imageMessageSchema = messageBaseSchema.extend({
    type: zod_1.z.literal('image'),
    url: zod_1.z.string()
});
const messageSchema = zod_1.z.union([textMessageSchema, imageMessageSchema]);
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
// // Usage Example
// const redis = new Redis();
// const typesafeRedis = new TypesafeRedis(redis);
// typesafeRedis.subscribe('my-channel', msg => {
// 	if (msg.type === 'text') {
// 		console.log('Received text message:', msg.text);
// 	} else if (msg.type === 'image') {
// 		console.log('Received image message:', msg.url);
// 	}
// });
// typesafeRedis.publish({
//   id: '1',
//   channel: 'my-channel',
//   type: 'text',
//   text: 'Hello, World!'
// });
//# sourceMappingURL=TSRedis.js.map