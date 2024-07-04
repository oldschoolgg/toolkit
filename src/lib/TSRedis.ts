import type Redis from 'ioredis';
import { z } from 'zod';

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
export class TSRedis {
	private redis: Redis;

	constructor(redis: Redis) {
		this.redis = redis;
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

	async setUsername(userID: string, username: string) {
		return this.redis.hset(this.getUserHash(userID), {
			username
		});
	}

	async getUsername(userID: string) {
		return this.redis.hget(this.getUserHash(userID), 'username');
	}
}
