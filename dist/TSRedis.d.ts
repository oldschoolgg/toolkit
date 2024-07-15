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