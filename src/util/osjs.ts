import deepMerge from 'deepmerge';
import { Items } from 'oldschooljs';
import type { Item } from 'oldschooljs/dist/meta/types';

export function modifyItem(itemName: string | number, data: Partial<Item>) {
	if (data.id) throw new Error('Cannot change item ID');
	const item = Items.get(itemName);
	if (!item) throw new Error(`Item ${itemName} does not exist`);
	Items.set(item.id, deepMerge(item, data));
}
