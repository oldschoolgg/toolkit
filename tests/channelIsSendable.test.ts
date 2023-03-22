import { expect, test } from 'vitest';

import { channelIsSendable } from '../src';

test('channelIsSendable', () => {
	expect(channelIsSendable(null)).toEqual(false);
});
