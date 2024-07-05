"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelIsSendable = channelIsSendable;
exports.isGuildChannel = isGuildChannel;
exports.discrimName = discrimName;
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
    if (channel.isDMBased())
        return true;
    const permissions = channel.permissionsFor(channel.client.user);
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    return permissions !== null && permissions.has('ViewChannel') && permissions.has('SendMessages');
}
function isGuildChannel(channel) {
    return channel !== undefined && !channel.isDMBased() && Boolean(channel.guild);
}
function discrimName(user) {
    return `${user.username}#${user.discriminator}`;
}
//# sourceMappingURL=discordJS.js.map