import { type RedisOptions } from 'ioredis';
import { z } from 'zod';
declare const channels: z.ZodEnum<["main"]>;
declare const messageSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"new_patron">;
    tier: z.ZodNumber;
    channel: z.ZodEnum<["main"]>;
}, "strip", z.ZodTypeAny, {
    type: "new_patron";
    tier: number;
    channel: "main";
}, {
    type: "new_patron";
    tier: number;
    channel: "main";
}>, z.ZodObject<{
    type: z.ZodLiteral<"ping">;
    channel: z.ZodEnum<["main"]>;
}, "strip", z.ZodTypeAny, {
    type: "ping";
    channel: "main";
}, {
    type: "ping";
    channel: "main";
}>]>;
type Message = z.infer<typeof messageSchema>;
type Channel = z.infer<typeof channels>;
export declare class TSRedis {
    private redis;
    constructor(options?: RedisOptions & {
        mocked: boolean;
    });
    subscribe(channel: Channel, callback: (message: Message) => void): void;
    publish(message: Message): void;
}
export {};
//# sourceMappingURL=TSRedis.d.ts.map