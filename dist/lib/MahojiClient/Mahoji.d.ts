import { type APIApplicationCommandOptionChoice, type ChatInputCommandInteraction, type Client, type CommandInteractionOption, type GuildMember, type Interaction, type InteractionReplyOptions, PermissionFlagsBits, type RESTPostAPIApplicationGuildCommandsJSONBody, type Snowflake, type User } from 'discord.js';
import type { CommandOption, CommandOptions, CommandRunOptions } from './mahojiTypes';
export declare function convertCommandOptionToAPIOption(option: CommandOption): any;
export declare function convertCommandToAPICommand(cmd: ICommand): RESTPostAPIApplicationGuildCommandsJSONBody & {
    description: string;
};
export declare function bulkUpdateCommands({ client, commands, guildID }: {
    client: MahojiClient;
    commands: ICommand[];
    guildID: Snowflake | null;
}): Promise<unknown>;
export declare function updateCommand({ client, command, guildID }: {
    client: MahojiClient;
    command: ICommand;
    guildID: Snowflake | null;
}): Promise<unknown>;
export declare function convertAPIOptionsToCommandOptions(options: ChatInputCommandInteraction['options']['data'], resolvedObjects: ChatInputCommandInteraction['options']['resolved'] | null): CommandOptions;
export declare function handleAutocomplete(command: ICommand | undefined, autocompleteData: CommandInteractionOption[], member: GuildMember | undefined, user: User, option?: CommandOption): Promise<APIApplicationCommandOptionChoice[]>;
export type CommandResponse = Promise<null | string | InteractionReplyOptions>;
export type ICommand = Readonly<{
    name: string;
    description: string;
    options: CommandOption[];
    requiredPermissions?: (keyof typeof PermissionFlagsBits)[];
    guildID?: string;
    run(options: CommandRunOptions): CommandResponse;
}>;
interface MahojiOptions {
    developmentServerID: string;
    applicationID: string;
    handlers?: Handlers;
    djsClient: Client;
    commands: ICommand[];
}
export interface Handlers {
    preCommand?: (options: {
        command: ICommand;
        interaction: ChatInputCommandInteraction;
        options: CommandOptions;
    }) => Promise<undefined | {
        reason: Awaited<InteractionReplyOptions>;
        dontRunPostCommand?: boolean;
    }>;
    postCommand?: (options: {
        command: ICommand;
        interaction: ChatInputCommandInteraction;
        error: Error | null;
        inhibited: boolean;
        options: CommandOptions;
    }) => Promise<unknown>;
}
export declare class MahojiClient {
    commands: Map<string, ICommand>;
    developmentServerID: string;
    applicationID: string;
    handlers: Handlers;
    djsClient: Client;
    constructor(options: MahojiOptions);
    parseInteraction(interaction: Interaction): Promise<void | import("discord.js").Message<boolean> | import("discord.js").InteractionResponse<boolean> | {
        error: Error;
    } | null>;
}
export {};
//# sourceMappingURL=Mahoji.d.ts.map