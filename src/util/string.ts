import { readFileSync } from 'node:fs';

export function ellipsize(str: string, maxLen = 2000) {
	if (str.length > maxLen) {
		return `${str.substring(0, maxLen - 3)}...`;
	}
	return str;
}

const wordBlacklistBase64 = readFileSync('./src/lib/wordBlacklist.txt', 'utf-8');
const wordBlacklist = Buffer.from(wordBlacklistBase64.trim(), 'base64')
	.toString('utf8')
	.split('\n')
	.map(word => word.trim().toLowerCase());

export function containsBlacklistedWord(str: string): boolean {
	const lowerCaseStr = str.toLowerCase();
	for (const word of wordBlacklist) {
		if (lowerCaseStr.includes(word)) {
			return true;
		}
	}
	return false;
}
