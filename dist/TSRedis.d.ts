import { type RedisOptions } from 'ioredis';
import { z } from 'zod';
declare const messageSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"new_patron">;
    tier: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "new_patron";
    tier: number;
}, {
    type: "new_patron";
    tier: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"ping">;
}, "strip", z.ZodTypeAny, {
    type: "ping";
}, {
    type: "ping";
}>, z.ZodObject<{
    type: z.ZodLiteral<"patron_tier_change">;
    new_tier: z.ZodNumber;
    old_tier: z.ZodNumber;
    discord_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "patron_tier_change";
    new_tier: number;
    old_tier: number;
    discord_id: string;
}, {
    type: "patron_tier_change";
    new_tier: number;
    old_tier: number;
    discord_id: string;
}>]>;
type Message = z.infer<typeof messageSchema>;
export declare class TSRedis {
    private redis;
    constructor(options?: RedisOptions & {
        mocked: boolean;
    });
    subscribe(callback: (message: Message) => void): void;
    publish(message: Message): void;
}
export {};
//# sourceMappingURL=TSRedis.d.ts.map