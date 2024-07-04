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
export declare enum PerkTier {
    /**
     * Boosters
     */
    One = 1,
    /**
     * Tier 1 Patron
     */
    Two = 2,
    /**
     * Tier 2 Patron, Contributors, Mods
     */
    Three = 3,
    /**
     * Tier 3 Patron
     */
    Four = 4,
    /**
     * Tier 4 Patron
     */
    Five = 5,
    /**
     * Tier 5 Patron
     */
    Six = 6,
    /**
     * Tier 6 Patron
     */
    Seven = 7
}
//# sourceMappingURL=misc.d.ts.map