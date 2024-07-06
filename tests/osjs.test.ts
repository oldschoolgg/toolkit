import { Items } from 'oldschooljs';
import { getItem } from 'oldschooljs/dist/util/util';
import { expect, test } from 'vitest';

import { modifyItem } from '../src/index';

test('modifyItem', () => {
	const item = getItem('Coal');
	if (!item) {
		throw new Error('Item not found');
	}
	modifyItem(item.id, {
		price: 100
	});

	for (const it of [getItem('Coal')!, Items.get('Coal')!]) {
		expect(it.price).toEqual(100);
	}
});
