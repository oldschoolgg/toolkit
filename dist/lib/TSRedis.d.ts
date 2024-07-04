import type Redis from 'ioredis';
import { z } from 'zod';
declare const channels: z.ZodEnum<["main"]>;
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
type Channel = z.infer<typeof channels>;
export declare class TSRedis {
    private redis;
    constructor(redis: Redis);
    subscribe(channel: Channel, callback: (message: Message) => void): void;
    publish(message: Message): void;
    set(key: string, value: string): Promise<"OK">;
    get(key: string): Promise<string | null>;
    private getUserHash;
    setUsername(userID: string, username: string): Promise<number>;
    getUsername(userID: string): Promise<string | null>;
}
export {};
//# sourceMappingURL=TSRedis.d.ts.map