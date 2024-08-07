"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphabeticalSort = exports.PerkTier = void 0;
exports.stripEmojis = stripEmojis;
exports.cleanString = cleanString;
exports.stringMatches = stringMatches;
exports.roboChimpCLRankQuery = roboChimpCLRankQuery;
exports.formatOrdinal = formatOrdinal;
exports.toTitleCase = toTitleCase;
exports.miniID = miniID;
exports.truncateString = truncateString;
exports.splitMessage = splitMessage;
exports.exponentialPercentScale = exponentialPercentScale;
exports.normal = normal;
exports.dateFm = dateFm;
exports.getInterval = getInterval;
exports.generateCommandInputs = generateCommandInputs;
const discord_js_1 = require("discord.js");
const e_1 = require("e");
const discord_1 = require("./discord");
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
function exponentialPercentScale(percent, decay = 0.021) {
    return 100 * Math.pow(Math.E, -decay * (100 - percent));
}
function normal(mu = 0, sigma = 1, nsamples = 6) {
    let run_total = 0;
    for (let i = 0; i < nsamples; i++) {
        run_total += Math.random();
    }
    return (sigma * (run_total - nsamples / 2)) / (nsamples / 2) + mu;
}
const alphabeticalSort = (a, b) => a.localeCompare(b);
exports.alphabeticalSort = alphabeticalSort;
function dateFm(date) {
    return `${(0, discord_js_1.time)(date, 'T')} (${(0, discord_js_1.time)(date, 'R')})`;
}
function getInterval(intervalHours) {
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
async function generateCommandInputs(options) {
    const results = [];
    const allPossibleOptions = {};
    for (const option of options) {
        switch (option.type) {
            case discord_js_1.ApplicationCommandOptionType.SubcommandGroup:
            case discord_js_1.ApplicationCommandOptionType.Subcommand:
                if (option.options) {
                    const subOptionsResults = await generateCommandInputs(option.options);
                    results.push(...subOptionsResults.map(input => ({ [option.name]: input })));
                }
                break;
            case discord_js_1.ApplicationCommandOptionType.String:
                if ('autocomplete' in option && option.autocomplete) {
                    const autoCompleteResults = await option.autocomplete('', { id: (0, discord_1.randomSnowflake)() }, {});
                    allPossibleOptions[option.name] = (0, e_1.shuffleArr)(autoCompleteResults.map(c => c.value)).slice(0, 3);
                }
                else if (option.choices) {
                    allPossibleOptions[option.name] = option.choices.map(c => c.value).slice(0, 3);
                }
                else if (['guild_id', 'message_id'].includes(option.name)) {
                    allPossibleOptions[option.name] = ['157797566833098752'];
                }
                else {
                    allPossibleOptions[option.name] = ['plain string'];
                }
                break;
            case discord_js_1.ApplicationCommandOptionType.Integer:
            case discord_js_1.ApplicationCommandOptionType.Number:
                if (option.choices) {
                    allPossibleOptions[option.name] = option.choices.map(c => c.value);
                }
                else {
                    let value = (0, e_1.randInt)(1, 10);
                    if (option.min_value && option.max_value) {
                        value = (0, e_1.randInt)(option.min_value, option.max_value);
                    }
                    allPossibleOptions[option.name] = [option.min_value, value];
                }
                break;
            case discord_js_1.ApplicationCommandOptionType.Boolean: {
                allPossibleOptions[option.name] = [true, false];
                break;
            }
            case discord_js_1.ApplicationCommandOptionType.User: {
                allPossibleOptions[option.name] = [
                    {
                        user: {
                            id: '425134194436341760',
                            username: 'username',
                            bot: false
                        },
                        member: undefined
                    }
                ];
                break;
            }
            case discord_js_1.ApplicationCommandOptionType.Channel:
            case discord_js_1.ApplicationCommandOptionType.Role:
            case discord_js_1.ApplicationCommandOptionType.Mentionable:
                // results.push({ ...currentPath, [option.name]: `Any ${option.type}` });
                break;
        }
    }
    const sorted = Object.values(allPossibleOptions).sort((a, b) => b.length - a.length);
    const longestOptions = sorted[0]?.length;
    for (let i = 0; i < longestOptions; i++) {
        const obj = {};
        for (const [key, val] of Object.entries(allPossibleOptions)) {
            obj[key] = val[i] ?? (0, e_1.randArrItem)(val);
        }
        results.push(obj);
    }
    return results;
}
//# sourceMappingURL=misc.js.map