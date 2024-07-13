import { type RedisOptions } from 'ioredis';
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
declare const userSchema: z.ZodObject<{
    username: z.ZodNullable<z.ZodString>;
    perk_tier: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    username: string | null;
    perk_tier: number | null;
}, {
    username: string | null;
    perk_tier: number | null;
}>;
type RedisUser = z.infer<typeof userSchema>;
export declare class TSRedis {
    private redis;
    constructor(options?: RedisOptions & {
        mocked: boolean;
    });
    subscribe(channel: Channel, callback: (message: Message) => void): void;
    publish(message: Message): void;
    set(key: string, value: string): Promise<"OK">;
    get(key: string): Promise<string | null>;
    private getUserHash;
    setUser(userID: string, changes: Partial<RedisUser>): Promise<number>;
    getUser(userID: string): Promise<RedisUser>;
}
export {};
//# sourceMappingURL=TSRedis.d.ts.map