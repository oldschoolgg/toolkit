import type Redis from 'ioredis';
import { z } from 'zod';

const messageBaseSchema = z.object({
	id: z.string(),
	channel: z.enum(['main'])
});

const textMessageSchema = messageBaseSchema.extend({
	type: z.literal('text'),
	text: z.string()
});

const imageMessageSchema = messageBaseSchema.extend({
	type: z.literal('image'),
	url: z.string()
});

const messageSchema = z.union([textMessageSchema, imageMessageSchema]);

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
