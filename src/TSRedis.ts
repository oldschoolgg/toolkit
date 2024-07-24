import Redis, { type RedisOptions } from 'ioredis';
import MockRedis from 'ioredis-mock';
import { z } from 'zod';

const patronTierChangeMessageSchema = z.object({
	type: z.literal('patron_tier_change'),
	new_tier: z.number().int(),
	old_tier: z.number().int(),
	discord_ids: z.array(z.string()),
	first_time_patron: z.boolean()
});

const pingMessageSchema = z.object({
	type: z.literal('ping')
});

const messageSchema = z.union([pingMessageSchema, patronTierChangeMessageSchema]);

type Message = z.infer<typeof messageSchema>;

const CHANNEL_ID = 'main';
export class TSRedis {
	private redis: Redis;

	constructor(options: RedisOptions & { mocked: boolean } = { mocked: false }) {
		this.redis = options.mocked ? new MockRedis(options) : new Redis(options);
	}

	disconnect() {
		return this.redis.disconnect();
	}

	subscribe(callback: (message: Message) => void) {
		this.redis.subscribe(CHANNEL_ID, (err, count) => {
			if (err) {
				console.error('Failed to subscribe: ', err);
			} else {
				console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
			}
		});

		this.redis.on('message', (receivedChannel, message) => {
			if (receivedChannel === CHANNEL_ID) {
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
		this.redis.publish(CHANNEL_ID, JSON.stringify(parsedMessage));
	}
}
