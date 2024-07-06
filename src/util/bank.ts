import { Time, calcWhatPercent, increaseNumByPercent } from 'e';
import { Bank, Items } from 'oldschooljs';
import type { ItemBank } from 'oldschooljs/dist/meta/types';

export function increaseBankQuantitesByPercent(bank: Bank, percent: number, whitelist: number[] | null = null) {
	for (const [key, value] of Object.entries(bank.bank)) {
		if (whitelist !== null && !whitelist.includes(Number.parseInt(key))) continue;
		const increased = Math.floor(increaseNumByPercent(value, percent));
		bank.bank[key] = increased;
	}
}

export function convertBankToPerHourStats(bank: Bank, time: number) {
	const result = [];
	for (const [item, qty] of bank.items()) {
		result.push(`${(qty / (time / Time.Hour)).toFixed(1)}/hr ${item.name}`);
	}
	return result;
}

export function calcDropRatesFromBank(bank: Bank, iterations: number, uniques: number[]) {
	const result = [];
	let uniquesReceived = 0;
	for (const [item, qty] of bank.items().sort((a, b) => a[1] - b[1])) {
		if (uniques.includes(item.id)) {
			uniquesReceived += qty;
		}
		const rate = Math.round(iterations / qty);
		if (rate < 2) continue;
		let { name } = item;
		if (uniques.includes(item.id)) name = `**${name}**`;
		result.push(`${qty}x ${name} (1 in ${rate})`);
	}
	result.push(
		`\n**${uniquesReceived}x Uniques (1 in ${Math.round(iterations / uniquesReceived)} which is ${calcWhatPercent(
			uniquesReceived,
			iterations
		)}%)**`
	);
	return result.join(', ');
}

export function calcDropRatesFromBankWithoutUniques(bank: Bank, iterations: number) {
	const results = [];
	for (const [item, qty] of bank.items().sort((a, b) => a[1] - b[1])) {
		const rate = Math.round(iterations / qty);
		if (rate < 2) continue;
		results.push(`${qty}x ${item.name} (1 in ${rate})`);
	}
	return results;
}

export function addBanks(banks: ItemBank[]): Bank {
	const bank = new Bank();
	for (const _bank of banks) {
		bank.add(_bank);
	}
	return bank;
}

export function averageBank(bank: Bank, kc: number) {
	const newBank = new Bank();
	for (const [item, qty] of bank.items()) {
		newBank.add(item.id, Math.floor(qty / kc));
	}
	return newBank;
}

export function generateRandomBank(size = 100, amountPerItem = 10000) {
	const bank = new Bank();
	for (let i = 0; i < size; i++) {
		bank.add(Items.random().id, amountPerItem);
	}
	return bank;
}
