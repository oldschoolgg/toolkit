export type GeneralBankType<T extends string | number> = Record<T, number>;
interface GeneralBankValueSchema {
    min: number;
    max: number;
    floats: boolean;
}
type BankValidator<T extends string | number> = (key: T, value: number, bank: GeneralBankType<T>) => void;
export declare class GeneralBank<T extends string | number> {
    private bank;
    private allowedKeys?;
    private validator?;
    private valueSchema;
    constructor({ allowedKeys, validator, initialBank, valueSchema }?: {
        allowedKeys?: T[] | readonly T[];
        validator?: BankValidator<T>;
        initialBank?: GeneralBankType<T>;
        valueSchema?: GeneralBankValueSchema;
    });
    get _bank(): GeneralBankType<T>;
    clone(): GeneralBank<T>;
    validate(): void;
    entries(): [T, number][];
    length(): number;
    amount(key: T): number;
    has(key: T): boolean;
    toString(): string;
    private addItem;
    private removeItem;
    add(keyOrBank: T | GeneralBank<T>, quantity?: number): this;
    remove(keyOrBank: T | GeneralBank<T>, quantity?: number): this;
}
export {};
//# sourceMappingURL=GeneralBank.d.ts.map