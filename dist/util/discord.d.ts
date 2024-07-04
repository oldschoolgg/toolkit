import { type Client, type Guild } from 'discord.js';
import type { MahojiClient } from 'mahoji';
export declare function randomSnowflake(): string;
export declare function mentionCommand(client: Client & {
    mahojiClient: MahojiClient;
}, name: string, subCommand?: string, subSubCommand?: string): string;
export declare function hasBanMemberPerms(userID: string, guild: Guild): Promise<boolean>;
//# sourceMappingURL=discord.d.ts.map