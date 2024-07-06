import { Bank } from 'oldschooljs';
import type { ItemBank } from 'oldschooljs/dist/meta/types';
export declare function increaseBankQuantitesByPercent(bank: Bank, percent: number, whitelist?: number[] | null): void;
export declare function convertBankToPerHourStats(bank: Bank, time: number): string[];
export declare function calcDropRatesFromBank(bank: Bank, iterations: number, uniques: number[]): string;
export declare function calcDropRatesFromBankWithoutUniques(bank: Bank, iterations: number): string[];
export declare function addBanks(banks: ItemBank[]): Bank;
export declare function averageBank(bank: Bank, kc: number): Bank;
export declare function generateRandomBank(size?: number, amountPerItem?: number): Bank;
//# sourceMappingURL=bank.d.ts.map