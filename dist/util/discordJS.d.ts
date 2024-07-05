import type { Channel, GuildTextBasedChannel, TextChannel, User } from 'discord.js';
/**
 * Checks if the bot can send a message to a channel object.
 * @param channel The channel to check if the bot can send a message to.
 */
export declare function channelIsSendable(channel: Channel | undefined | null): channel is TextChannel;
export declare function isGuildChannel(channel?: Channel): channel is GuildTextBasedChannel;
export declare function discrimName(user: User): string;
//# sourceMappingURL=discordJS.d.ts.map