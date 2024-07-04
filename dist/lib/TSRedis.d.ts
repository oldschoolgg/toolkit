import type Redis from 'ioredis';
import { z } from 'zod';
declare const channels: z.ZodEnum<["main"]>;
declare const messageSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
    channel: z.ZodEnum<["main"]>;
}, "strip", z.ZodTypeAny, {
    type: "text";
    channel: "main";
    text: string;
}, {
    type: "text";
    channel: "main";
    text: string;
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
declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    perk_tier: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    perk_tier: number;
}, {
    username: string;
    perk_tier: number;
}>;
type RedisUser = z.infer<typeof userSchema>;
export declare class TSRedis {
    private redis;
    constructor(redis: Redis);
    subscribe(channel: Channel, callback: (message: Message) => void): void;
    publish(message: Message): void;
    set(key: string, value: string): Promise<"OK">;
    get(key: string): Promise<string | null>;
    private getUserHash;
    setUser(userID: string, changes: Partial<RedisUser>): Promise<number>;
    getUser(userID: string): Promise<Partial<RedisUser>>;
}
export {};
//# sourceMappingURL=TSRedis.d.ts.map