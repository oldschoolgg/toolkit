import Redis, { type RedisOptions } from 'ioredis';
import MockRedis from 'ioredis-mock';
import { z } from 'zod';
import { cleanUsername } from './util/discord';

const channels = z.enum(['main']);

const patronUpdateMessageSchema = z.object({
	type: z.literal('text'),
	text: z.string(),
	channel: channels
});

const pingMessageSchema = z.object({
	type: z.literal('ping'),
	channel: channels
});

const messageSchema = z.union([patronUpdateMessageSchema, pingMessageSchema]);

type Message = z.infer<typeof messageSchema>;
type Channel = z.infer<typeof channels>;

const userSchema = z.object({
	username: z.string().nullable(),
	perk_tier: z.number().nullable(),
	osb_badges: z.string().nullable(),
	bso_badges: z.string().nullable()
});

type RedisUser = z.infer<typeof userSchema>;

export class TSRedis {
	private redis: Redis;

	constructor(options: RedisOptions & { mocked: boolean } = { mocked: false }) {
		this.redis = options.mocked ? new MockRedis(options) : new Redis(options);
	}

	subscribe(channel: Channel, callback: (message: Message) => void) {
		this.redis.subscribe(channel, (err, count) => {
			if (err) {
				console.error('Failed to subscribe: ', err);
			} else {
				console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
			}
		});

		this.redis.on('message', (receivedChannel, message) => {
			if (receivedChannel === channel) {
				try {
					const parsedMessage = JSON.parse(message);
					const validatedMessage = messageSchema.parse(parsedMessage);
					callback(validatedMessage);
				} catch (error) {
					console.error('Failed to parse message: ', error);
				}
			}
		});
	}

	publish(message: Message) {
		const parsedMessage = messageSchema.parse(message);
		this.redis.publish(parsedMessage.channel, JSON.stringify(parsedMessage));
	}

	async set(key: string, value: string) {
		return this.redis.set(key, value);
	}

	async get(key: string) {
		return this.redis.get(key);
	}

	private getUserHash(userID: string) {
		return `user.${userID}`;
	}

	async setUser(userID: string, changes: Partial<RedisUser>) {
		if (changes.username) {
			changes.username = cleanUsername(changes.username);
		}
		return this.redis.hset(this.getUserHash(userID), changes);
	}

	async getUser(userID: string): Promise<RedisUser> {
		const user = await this.redis.hgetall(this.getUserHash(userID));

		return {
			username: user.username ?? null,
			perk_tier: user.perk_tier ? Number.parseInt(user.perk_tier) : null,
			osb_badges: user.osb_badges ?? null,
			bso_badges: user.bso_badges ?? null
		};
	}
}
