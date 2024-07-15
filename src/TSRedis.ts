import Redis, { type RedisOptions } from 'ioredis';
import MockRedis from 'ioredis-mock';
import { z } from 'zod';

const channels = z.enum(['main']);

const newPatronMessageSchema = z.object({
	type: z.literal('new_patron'),
	tier: z.number().int(),
	channel: channels
});

const pingMessageSchema = z.object({
	type: z.literal('ping'),
	channel: channels
});

const messageSchema = z.union([newPatronMessageSchema, pingMessageSchema]);

type Message = z.infer<typeof messageSchema>;
type Channel = z.infer<typeof channels>;

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
}
