import type Redis from 'ioredis';
import { z } from 'zod';
declare const messageSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
    channel: z.ZodEnum<["main"]>;
}, "strip", z.ZodTypeAny, {
    type: "text";
    text: string;
    channel: "main";
}, {
    type: "text";
    text: string;
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
export declare class TSRedis {
    private redis;
    constructor(redis: Redis);
    subscribe(channel: string, callback: (message: Message) => void): void;
    publish(message: Message): void;
}
export {};
//# sourceMappingURL=TSRedis.d.ts.map