import { Channel, DMChannel, GuildTextBasedChannel, PermissionsBitField, TextChannel, User } from 'discord.js';

/* c8 ignore start */
/**
 * Checks if the bot can send a message to a channel object.
 * @param channel The channel to check if the bot can send a message to.
 */
export function channelIsSendable(channel: Channel | undefined | null): channel is TextChannel {
	if (!channel) return false;
	if (!channel.isTextBased()) return false;
	if (!('guild' in channel)) return true;
	const canSend = channel.permissionsFor(channel.client.user!)!.has(PermissionsBitField.Flags.ViewChannel);
	if (!(channel instanceof DMChannel) && !(channel instanceof TextChannel) && canSend) {
		return false;
	}

	return true;
}

export function isGuildChannel(channel?: Channel): channel is GuildTextBasedChannel {
	return channel !== undefined && !channel.isDMBased() && Boolean(channel.guild);
}

export function discrimName(user: User) {
	return `${user.username}#${user.discriminator}`;
}
