"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerkTier = void 0;
exports.stripEmojis = stripEmojis;
exports.cleanString = cleanString;
exports.stringMatches = stringMatches;
exports.roboChimpCLRankQuery = roboChimpCLRankQuery;
exports.formatOrdinal = formatOrdinal;
exports.toTitleCase = toTitleCase;
exports.miniID = miniID;
exports.truncateString = truncateString;
exports.splitMessage = splitMessage;
const e_1 = require("e");
const emojiRegex = require('emoji-regex');
const rawEmojiRegex = emojiRegex();
function stripEmojis(str) {
    return str.replace(rawEmojiRegex, '');
}
function cleanString(str) {
    return str.replace(/[^0-9a-zA-Z+]/gi, '').toUpperCase();
}
function stringMatches(str = '', str2 = '') {
    return cleanString(str.toString()) === cleanString(str2.toString());
}
function roboChimpCLRankQuery(userID) {
    return `SELECT COUNT(*)::int
FROM public.user
WHERE ((osb_cl_percent + bso_cl_percent) / 2) >= (
												  SELECT (((COALESCE(osb_cl_percent, 0)) + (COALESCE(bso_cl_percent, 0))) / 2)
												  FROM public.user
												  WHERE id = ${userID}
												 );`;
}
const englishOrdinalRules = new Intl.PluralRules('en', { type: 'ordinal' });
const suffixes = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th'
};
function formatOrdinal(number) {
    const suffix = suffixes[englishOrdinalRules.select(number)];
    return `${number}${suffix}`;
}
function toTitleCase(str) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}
const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function miniID(length) {
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomChar = validChars[Math.floor(Math.random() * validChars.length)];
        id += randomChar;
    }
    return id;
}
function truncateString(str, maxLen) {
    if (str.length < maxLen)
        return str;
    return `${str.slice(0, maxLen - 3)}...`;
}
function splitMessage(text, { maxLength = 2000, char = '\n', prepend = '', append = '' } = {}) {
    if (text.length <= maxLength)
        return [text];
    let splitText = [text];
    if (Array.isArray(char)) {
        while (char.length > 0 && splitText.some(elem => elem.length > maxLength)) {
            const currentChar = char.shift();
            if (currentChar instanceof RegExp) {
                splitText = splitText.flatMap(chunk => chunk.match(currentChar)).filter(e_1.notEmpty);
            }
            else {
                splitText = splitText.flatMap(chunk => chunk.split(currentChar));
            }
        }
    }
    else {
        splitText = text.split(char);
    }
    if (splitText.some(elem => elem.length > maxLength))
        throw new RangeError('SPLIT_MAX_LEN');
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
var PerkTier;
(function (PerkTier) {
    /**
     * Boosters
     */
    PerkTier[PerkTier["One"] = 1] = "One";
    /**
     * Tier 1 Patron
     */
    PerkTier[PerkTier["Two"] = 2] = "Two";
    /**
     * Tier 2 Patron, Contributors, Mods
     */
    PerkTier[PerkTier["Three"] = 3] = "Three";
    /**
     * Tier 3 Patron
     */
    PerkTier[PerkTier["Four"] = 4] = "Four";
    /**
     * Tier 4 Patron
     */
    PerkTier[PerkTier["Five"] = 5] = "Five";
    /**
     * Tier 5 Patron
     */
    PerkTier[PerkTier["Six"] = 6] = "Six";
    /**
     * Tier 6 Patron
     */
    PerkTier[PerkTier["Seven"] = 7] = "Seven";
})(PerkTier || (exports.PerkTier = PerkTier = {}));
//# sourceMappingURL=misc.js.map