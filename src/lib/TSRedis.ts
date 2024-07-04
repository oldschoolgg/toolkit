import type Redis from 'ioredis';
import { z } from 'zod';

const patronUpdateMessageSchema = z.object({
	type: z.literal('text'),
	text: z.string(),
	channel: z.enum(['main'])
});

const pingMessageSchema = z.object({
	type: z.literal('ping'),
	channel: z.enum(['main'])
});

const messageSchema = z.union([patronUpdateMessageSchema, pingMessageSchema]);

type Message = z.infer<typeof messageSchema>;

export class TSRedis {
	private redis: Redis;

	constructor(redis: Redis) {
		this.redis = redis;
	}

	subscribe(channel: string, callback: (message: Message) => void) {
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
}
