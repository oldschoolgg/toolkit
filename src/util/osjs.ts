import deepMerge from 'deepmerge';
import { Bank, Items } from 'oldschooljs';
import { Item } from 'oldschooljs/dist/meta/types';

export function modifyItem(itemName: string | number, data: Partial<Item>) {
	if (data.id) throw new Error('Cannot change item ID');
	const item = Items.get(itemName);
	if (!item) throw new Error(`Item ${itemName} does not exist`);
	Items.set(item.id, deepMerge(item, data));
}

export function sanitizeBank(bank: Bank) {
	for (const [key, value] of Object.entries(bank.bank)) {
		if (value < 1) {
			delete bank.bank[key];
		}

		if (!Number.isInteger(value)) {
			bank.bank[key] = Math.floor(value);
		}

		const item = getItem(key);
		if (!item) {
			delete bank.bank[key];
		}
	}
	return bank;
}

export function getItem(itemName: string | number | undefined): Item | null {
	if (!itemName) return null;
	const item = Items.get(itemName);
	return item ?? null;
}
