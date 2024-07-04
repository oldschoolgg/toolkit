import { type Channel, DMChannel, type GuildTextBasedChannel, TextChannel, type User } from 'discord.js';

/* c8 ignore start */
/**
 * Checks if the bot can send a message to a channel object.
 * @param channel The channel to check if the bot can send a message to.
 */
export function channelIsSendable(channel: Channel | undefined | null): channel is TextChannel {
	if (!channel) return false;
	if (!channel.isTextBased()) return false;
	if (!('guild' in channel)) return true;
	const permissions = channel.permissionsFor(channel.client.user!);
	if (!permissions) return false;
	const canSend = permissions.has('ViewChannel') && permissions.has('SendMessages');
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
