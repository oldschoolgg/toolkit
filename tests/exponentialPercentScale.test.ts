import { expect, test } from 'vitest';

import { exponentialPercentScale } from '../dist/util/misc';

test('exponentialPercentScale', () => {
	for (let i = 0; i < 100; i++) {
		const num = exponentialPercentScale(i);
		expect(num > 0 && num <= 100).toBeTruthy();
	}
	expect(exponentialPercentScale(100)).toEqual(100);
});
