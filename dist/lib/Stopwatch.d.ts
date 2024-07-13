export declare class Stopwatch {
    #private;
    digits: number;
    constructor(digits?: number);
    get duration(): number;
    get running(): boolean;
    restart(): this;
    reset(): this;
    start(): this;
    stop(text?: string): this;
    toString(): string;
    lastCheckpoint: number | null;
    check(text: string): void;
}
//# sourceMappingURL=Stopwatch.d.ts.map