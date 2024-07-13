"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSRedis = void 0;
const discord_js_1 = require("discord.js");
const ioredis_1 = __importDefault(require("ioredis"));
const ioredis_mock_1 = __importDefault(require("ioredis-mock"));
const zod_1 = require("zod");
const misc_1 = require("./util/misc");
function cleanUsername(username) {
    return (0, discord_js_1.escapeMarkdown)((0, misc_1.stripEmojis)(username)).substring(0, 32);
}
const channels = zod_1.z.enum(['main']);
const patronUpdateMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('text'),
    text: zod_1.z.string(),
    channel: channels
});
const pingMessageSchema = zod_1.z.object({
    type: zod_1.z.literal('ping'),
    channel: channels
});
const messageSchema = zod_1.z.union([patronUpdateMessageSchema, pingMessageSchema]);
const userSchema = zod_1.z.object({
    username: zod_1.z.string().nullable(),
    perk_tier: zod_1.z.number().nullable(),
    osb_badges: zod_1.z.string().nullable(),
    bso_badges: zod_1.z.string().nullable()
});
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
    async set(key, value) {
        return this.redis.set(key, value);
    }
    async get(key) {
        return this.redis.get(key);
    }
    getUserHash(userID) {
        return `user.${userID}`;
    }
    async setUser(userID, changes) {
        if (changes.username) {
            changes.username = cleanUsername(changes.username);
        }
        return this.redis.hset(this.getUserHash(userID), changes);
    }
    async getUser(userID) {
        const user = await this.redis.hgetall(this.getUserHash(userID));
        return {
            username: user.username ?? null,
            perk_tier: user.perk_tier ? Number.parseInt(user.perk_tier) : null,
            osb_badges: user.osb_badges ?? null,
            bso_badges: user.bso_badges ?? null
        };
    }
}
exports.TSRedis = TSRedis;
//# sourceMappingURL=TSRedis.js.map