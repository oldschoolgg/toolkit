// eslint-disable-next-line @typescript-eslint/no-var-requires
const emojiRegex = require('emoji-regex');

const rawEmojiRegex = emojiRegex();

export function stripEmojis(str: string) {
	return str.replace(rawEmojiRegex, '');
}

export function cleanString(str: string) {
	return str.replace(/[^0-9a-zA-Z+]/gi, '').toUpperCase();
}
export function stringMatches(str: string | number = '', str2: string | number = '') {
	return cleanString(str.toString()) === cleanString(str2.toString());
}

export function roboChimpCLRankQuery(userID: bigint) {
	return `SELECT COUNT(*)
FROM public.user
WHERE ((osb_cl_percent + bso_cl_percent) / 2) >= (
												  SELECT (((COALESCE(osb_cl_percent, 0)) + (COALESCE(bso_cl_percent, 0))) / 2)
												  FROM public.user
												  WHERE id = ${userID}
												 );`;
}
