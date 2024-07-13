import { type ButtonBuilder, type Client, type Guild, type InteractionReplyOptions } from 'discord.js';
import type { MahojiClient } from '../lib/MahojiClient/Mahoji';
export declare function randomSnowflake(): string;
export declare function mentionCommand(client: Client & {
    mahojiClient: MahojiClient;
}, name: string, subCommand?: string, subSubCommand?: string): string;
export declare function hasBanMemberPerms(userID: string, guild: Guild): Promise<boolean>;
export declare function isValidDiscordSnowflake(snowflake: string): boolean;
export declare function makeComponents(components: ButtonBuilder[]): InteractionReplyOptions['components'];
export declare function cleanUsername(username: string): string;
//# sourceMappingURL=discord.d.ts.map