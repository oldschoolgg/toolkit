export declare function stripEmojis(str: string): string;
export declare function cleanString(str: string): string;
export declare function stringMatches(str?: string | number, str2?: string | number): boolean;
export declare function roboChimpCLRankQuery(userID: bigint): string;
export declare function formatOrdinal(number: number): string;
export declare function toTitleCase(str: string): string;
export declare function miniID(length: number): string;
export declare function truncateString(str: string, maxLen: number): string;
export declare function splitMessage(text: string, { maxLength, char, prepend, append }?: {
    maxLength?: number | undefined;
    char?: string | undefined;
    prepend?: string | undefined;
    append?: string | undefined;
}): string[];
//# sourceMappingURL=misc.d.ts.map