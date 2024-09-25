import { type RedisOptions } from 'ioredis';
import { z } from 'zod';
declare const messageSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"ping">;
}, "strip", z.ZodTypeAny, {
    type: "ping";
}, {
    type: "ping";
}>, z.ZodObject<{
    type: z.ZodLiteral<"patron_tier_change">;
    new_tier: z.ZodNumber;
    old_tier: z.ZodNumber;
    discord_ids: z.ZodArray<z.ZodString, "many">;
    first_time_patron: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "patron_tier_change";
    new_tier: number;
    old_tier: number;
    discord_ids: string[];
    first_time_patron: boolean;
}, {
    type: "patron_tier_change";
    new_tier: number;
    old_tier: number;
    discord_ids: string[];
    first_time_patron: boolean;
}>]>;
type Message = z.infer<typeof messageSchema>;
export declare class TSRedis {
    private redis;
    isMocked: boolean;
    constructor(options?: RedisOptions & {
        mocked: boolean;
    });
    disconnect(): void | Promise<void>;
    subscribe(callback: (message: Message) => void): Promise<void> | undefined;
    publish(message: Message): Promise<void> | Promise<number>;
}
export {};
//# sourceMappingURL=TSRedis.d.ts.map