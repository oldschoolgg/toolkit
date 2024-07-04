"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelIsSendable = channelIsSendable;
exports.isGuildChannel = isGuildChannel;
exports.discrimName = discrimName;
const discord_js_1 = require("discord.js");
/* c8 ignore start */
/**
 * Checks if the bot can send a message to a channel object.
 * @param channel The channel to check if the bot can send a message to.
 */
function channelIsSendable(channel) {
    if (!channel)
        return false;
    if (!channel.isTextBased())
        return false;
    if (!('guild' in channel))
        return true;
    const permissions = channel.permissionsFor(channel.client.user);
    if (!permissions)
        return false;
    const canSend = permissions.has('ViewChannel') && permissions.has('SendMessages');
    if (!(channel instanceof discord_js_1.DMChannel) && !(channel instanceof discord_js_1.TextChannel) && canSend) {
        return false;
    }
    return true;
}
function isGuildChannel(channel) {
    return channel !== undefined && !channel.isDMBased() && Boolean(channel.guild);
}
function discrimName(user) {
    return `${user.username}#${user.discriminator}`;
}
//# sourceMappingURL=discordJS.js.map