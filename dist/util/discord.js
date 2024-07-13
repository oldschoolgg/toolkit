"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSnowflake = randomSnowflake;
exports.mentionCommand = mentionCommand;
exports.hasBanMemberPerms = hasBanMemberPerms;
exports.isValidDiscordSnowflake = isValidDiscordSnowflake;
exports.makeComponents = makeComponents;
exports.cleanUsername = cleanUsername;
const discord_js_1 = require("discord.js");
const e_1 = require("e");
const misc_1 = require("./misc");
const discordEpoch = 1420070400000;
function randomSnowflake() {
    const timestamp = Date.now() - discordEpoch;
    const workerId = Math.floor(Math.random() * 32);
    const processId = Math.floor(Math.random() * 32);
    const increment = Math.floor(Math.random() * 4096);
    const timestampPart = BigInt(timestamp) << 22n;
    const workerIdPart = BigInt(workerId) << 17n;
    const processIdPart = BigInt(processId) << 12n;
    const incrementPart = BigInt(increment);
    const snowflakeBigInt = timestampPart | workerIdPart | processIdPart | incrementPart;
    return snowflakeBigInt.toString();
}
function mentionCommand(client, name, subCommand, subSubCommand) {
    const command = client.mahojiClient.commands.get(name);
    if (!command) {
        throw new Error(`Command ${name} not found`);
    }
    if (subCommand && !command.options.some(i => i.name === subCommand)) {
        throw new Error(`Command ${name} does not have subcommand ${subCommand}`);
    }
    const apiCommand = client.application
        ? Array.from(client.application.commands.cache.values()).find(i => i.name === name)
        : null;
    if (!apiCommand) {
        throw new Error(`Command ${name} not found`);
    }
    if (subCommand) {
        return `</${name} ${subCommand}${subSubCommand ? ` ${subSubCommand}` : ''}:${apiCommand.id}>`;
    }
    return `</${name}:${apiCommand.id}>`;
}
async function hasBanMemberPerms(userID, guild) {
    const member = await guild.members.fetch(userID).catch(() => null);
    if (!member)
        return false;
    return member.permissions.has(discord_js_1.PermissionsBitField.Flags.BanMembers);
}
function isValidDiscordSnowflake(snowflake) {
    return /^\d{17,19}$/.test(snowflake);
}
function makeComponents(components) {
    return (0, e_1.chunk)(components, 5).map(i => ({ components: i, type: discord_js_1.ComponentType.ActionRow }));
}
function cleanUsername(username) {
    return (0, discord_js_1.escapeMarkdown)((0, misc_1.stripEmojis)(username)).substring(0, 32);
}
//# sourceMappingURL=discord.js.map