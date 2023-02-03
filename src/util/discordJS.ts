import { Channel, DMChannel, PermissionsBitField, TextChannel } from 'discord.js';

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
