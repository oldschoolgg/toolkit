import type Redis from 'ioredis';
import { z } from 'zod';
declare const messageSchema: z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
    channel: z.ZodEnum<["main"]>;
}, {
    type: z.ZodLiteral<"text">;
    text: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "text";
    id: string;
    channel: "main";
    text: string;
}, {
    type: "text";
    id: string;
    channel: "main";
    text: string;
}>, z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
    channel: z.ZodEnum<["main"]>;
}, {
    type: z.ZodLiteral<"image">;
    url: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    type: "image";
    id: string;
    url: string;
    channel: "main";
}, {
    type: "image";
    id: string;
    url: string;
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