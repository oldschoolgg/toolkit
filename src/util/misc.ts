import { time } from 'discord.js';
import { notEmpty } from 'e';

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
	return `SELECT COUNT(*)::int
FROM public.user
WHERE ((osb_cl_percent + bso_cl_percent) / 2) >= (
												  SELECT (((COALESCE(osb_cl_percent, 0)) + (COALESCE(bso_cl_percent, 0))) / 2)
												  FROM public.user
												  WHERE id = ${userID}
												 );`;
}

const englishOrdinalRules = new Intl.PluralRules('en', { type: 'ordinal' });

const suffixes: { [key: string]: string } = {
	one: 'st',
	two: 'nd',
	few: 'rd',
	other: 'th'
};

export function formatOrdinal(number: number): string {
	const suffix = suffixes[englishOrdinalRules.select(number)];
	return `${number}${suffix}`;
}

export function toTitleCase(str: string) {
	const splitStr = str.toLowerCase().split(' ');
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(' ');
}

const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function miniID(length: number): string {
	let id = '';

	for (let i = 0; i < length; i++) {
		const randomChar = validChars[Math.floor(Math.random() * validChars.length)];

		id += randomChar;
	}

	return id;
}

export function truncateString(str: string, maxLen: number) {
	if (str.length < maxLen) return str;
	return `${str.slice(0, maxLen - 3)}...`;
}

export function splitMessage(text: string, { maxLength = 2000, char = '\n', prepend = '', append = '' } = {}) {
	if (text.length <= maxLength) return [text];
	let splitText: string[] = [text];
	if (Array.isArray(char)) {
		while (char.length > 0 && splitText.some(elem => elem.length > maxLength)) {
			const currentChar = char.shift();
			if (currentChar instanceof RegExp) {
				splitText = splitText.flatMap(chunk => chunk.match(currentChar)).filter(notEmpty);
			} else {
				splitText = splitText.flatMap(chunk => chunk.split(currentChar));
			}
		}
	} else {
		splitText = text.split(char);
	}
	if (splitText.some(elem => elem.length > maxLength)) throw new RangeError('SPLIT_MAX_LEN');
	const messages = [];
	let msg = '';
	for (const chunk of splitText) {
		if ((msg + char + chunk + append).length > maxLength) {
			messages.push(msg + append);
			msg = prepend;
		}
		msg += (msg !== prepend ? char : '') + chunk;
	}
	return messages.concat(msg).filter(m => m);
}

export enum PerkTier {
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

export function exponentialPercentScale(percent: number, decay = 0.021) {
	return 100 * Math.pow(Math.E, -decay * (100 - percent));
}

export function normal(mu = 0, sigma = 1, nsamples = 6) {
	let run_total = 0;

	for (let i = 0; i < nsamples; i++) {
		run_total += Math.random();
	}

	return (sigma * (run_total - nsamples / 2)) / (nsamples / 2) + mu;
}

export const alphabeticalSort = (a: string, b: string) => a.localeCompare(b);

export function dateFm(date: Date) {
	return `${time(date, 'T')} (${time(date, 'R')})`;
}

export function getInterval(intervalHours: number) {
	const currentTime = new Date();
	const currentHour = currentTime.getHours();

	// Find the nearest interval start hour (0, intervalHours, 2*intervalHours, etc.)
	const startHour = currentHour - (currentHour % intervalHours);
	const startInterval = new Date(currentTime);
	startInterval.setHours(startHour, 0, 0, 0);

	const endInterval = new Date(startInterval);
	endInterval.setHours(startHour + intervalHours);

	return {
		start: startInterval,
		end: endInterval,
		nextResetStr: dateFm(endInterval)
	};
}
