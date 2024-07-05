"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MahojiClient = void 0;
exports.convertCommandOptionToAPIOption = convertCommandOptionToAPIOption;
exports.convertCommandToAPICommand = convertCommandToAPICommand;
exports.bulkUpdateCommands = bulkUpdateCommands;
exports.updateCommand = updateCommand;
exports.convertAPIOptionsToCommandOptions = convertAPIOptionsToCommandOptions;
exports.handleAutocomplete = handleAutocomplete;
const discord_js_1 = require("discord.js");
function convertCommandOptionToAPIOption(option) {
    switch (option.type) {
        case discord_js_1.ApplicationCommandOptionType.Number:
        case discord_js_1.ApplicationCommandOptionType.Integer:
        case discord_js_1.ApplicationCommandOptionType.String: {
            return {
                ...option,
                autocomplete: 'autocomplete' in option ?? false
            };
        }
        default: {
            return {
                ...option,
                // TODO(gc): How the fuck do I fix this
                // @ts-ignore
                options: 'options' in option && option.options ? option.options.map(convertCommandOptionToAPIOption) : []
            };
        }
    }
}
function convertCommandToAPICommand(cmd) {
    return {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: cmd.name,
        description: cmd.description,
        options: cmd.options.map(convertCommandOptionToAPIOption)
    };
}
async function bulkUpdateCommands({ client, commands, guildID }) {
    const apiCommands = commands.map(convertCommandToAPICommand);
    const route = guildID === null
        ? discord_js_1.Routes.applicationCommands(client.applicationID)
        : discord_js_1.Routes.applicationGuildCommands(client.applicationID, guildID);
    return client.djsClient.rest.put(route, {
        body: apiCommands
    });
}
async function updateCommand({ client, command, guildID }) {
    const apiCommand = convertCommandToAPICommand(command);
    const route = guildID === null
        ? discord_js_1.Routes.applicationCommands(client.applicationID)
        : discord_js_1.Routes.applicationGuildCommands(client.applicationID, guildID ?? command.guildID);
    return client.djsClient.rest.post(route, {
        body: apiCommand
    });
}
function convertAPIOptionsToCommandOptions(options, resolvedObjects) {
    if (!options)
        return {};
    const parsedOptions = {};
    for (const opt of options) {
        if (opt.type === discord_js_1.ApplicationCommandOptionType.SubcommandGroup ||
            opt.type === discord_js_1.ApplicationCommandOptionType.Subcommand) {
            const opts = {};
            for (const [key, value] of Object.entries(convertAPIOptionsToCommandOptions(opt.options ?? [], resolvedObjects))) {
                opts[key] = value;
            }
            parsedOptions[opt.name] = opts;
        }
        else if (opt.type === discord_js_1.ApplicationCommandOptionType.Channel) {
            if (resolvedObjects?.channels) {
                parsedOptions[opt.name] = resolvedObjects.channels.get(opt.value);
            }
        }
        else if (opt.type === discord_js_1.ApplicationCommandOptionType.Role) {
            if (resolvedObjects?.roles) {
                parsedOptions[opt.name] = resolvedObjects.roles.get(opt.value);
            }
        }
        else if (opt.type === discord_js_1.ApplicationCommandOptionType.User) {
            if (resolvedObjects?.users) {
                parsedOptions[opt.name] = {
                    user: resolvedObjects.users.get(opt.value),
                    member: resolvedObjects.members?.has(opt.value)
                        ? resolvedObjects.members.get(opt.value)
                        : undefined
                };
            }
        }
        else {
            parsedOptions[opt.name] = opt.value;
        }
    }
    return parsedOptions;
}
async function handleAutocomplete(command, autocompleteData, member, user, option) {
    if (!command || !autocompleteData)
        return [];
    const data = autocompleteData.find(i => 'focused' in i && i.focused === true) ?? autocompleteData[0];
    if (data.type === discord_js_1.ApplicationCommandOptionType.SubcommandGroup) {
        const group = command.options.find(c => c.name === data.name);
        if (group?.type !== discord_js_1.ApplicationCommandOptionType.SubcommandGroup)
            return [];
        const subCommand = group.options?.find(c => c.name === data.options?.[0].name && c.type === discord_js_1.ApplicationCommandOptionType.Subcommand);
        if (!subCommand ||
            !data.options ||
            !data.options[0] ||
            subCommand.type !== discord_js_1.ApplicationCommandOptionType.Subcommand) {
            return [];
        }
        const option = data.options[0].options?.find(t => t.focused);
        if (!option)
            return [];
        const subSubCommand = subCommand.options?.find(o => o.name === option.name);
        return handleAutocomplete(command, [option], member, user, subSubCommand);
    }
    if (data.type === discord_js_1.ApplicationCommandOptionType.Subcommand) {
        if (!data.options || !data.options[0])
            return [];
        const subCommand = command.options.find(c => c.name === data.name);
        if (subCommand?.type !== discord_js_1.ApplicationCommandOptionType.Subcommand)
            return [];
        const option = data.options.find(o => ('focused' in o ? Boolean(o.focused) : false)) ?? data.options[0];
        const subOption = subCommand.options?.find(c => c.name === option.name);
        if (!subOption)
            return [];
        return handleAutocomplete(command, [option], member, user, subOption);
    }
    const optionBeingAutocompleted = option ?? command.options.find(o => o.name === data.name);
    if (optionBeingAutocompleted &&
        'autocomplete' in optionBeingAutocompleted &&
        optionBeingAutocompleted.autocomplete !== undefined) {
        const autocompleteResult = await optionBeingAutocompleted.autocomplete(data.value, user, member);
        return autocompleteResult.slice(0, 25).map(i => ({
            name: i.name,
            value: i.value.toString()
        }));
    }
    return [];
}
class MahojiClient {
    constructor(options) {
        Object.defineProperty(this, "commands", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "developmentServerID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "applicationID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "djsClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.developmentServerID = options.developmentServerID;
        this.applicationID = options.applicationID;
        this.handlers = options.handlers ?? {};
        this.djsClient = options.djsClient;
        for (const command of options.commands) {
            this.commands.set(command.name, command);
        }
    }
    async parseInteraction(interaction) {
        const member = interaction.inCachedGuild() ? interaction.member : undefined;
        if (interaction.isAutocomplete()) {
            const command = this.commands.get(interaction.commandName);
            const choices = await handleAutocomplete(command, interaction.options.data, member, interaction.user);
            return interaction.respond(choices);
        }
        if (interaction.isChatInputCommand()) {
            const command = this.commands.get(interaction.commandName);
            if (!command)
                return null;
            // Permissions
            if (command.requiredPermissions) {
                if (!interaction.member || !interaction.memberPermissions)
                    return null;
                for (const perm of command.requiredPermissions) {
                    if (!interaction.memberPermissions.has(discord_js_1.PermissionFlagsBits[perm])) {
                        return interaction.reply({
                            content: "You don't have permission to use this command.",
                            ephemeral: true
                        });
                    }
                }
            }
            const options = convertAPIOptionsToCommandOptions(interaction.options.data, interaction.options.resolved);
            let error = null;
            let inhibited = false;
            let runPostCommand = true;
            try {
                const inhibitedResponse = await this.handlers.preCommand?.({
                    command,
                    interaction,
                    options
                });
                if (inhibitedResponse) {
                    if (inhibitedResponse.dontRunPostCommand)
                        runPostCommand = false;
                    inhibited = true;
                    return interaction.reply({
                        ephemeral: true,
                        ...inhibitedResponse.reason
                    });
                }
                const response = await command.run({
                    interaction,
                    options,
                    client: this,
                    user: interaction.user,
                    member: interaction.member,
                    channelID: interaction.channelId,
                    guildID: interaction.guild?.id,
                    userID: interaction.user.id,
                    djsClient: this.djsClient
                });
                if (!response)
                    return;
                if (interaction.replied) {
                    return interaction.followUp(response);
                }
                if (interaction.deferred) {
                    return interaction.editReply(response);
                }
                const replyResponse = await interaction.reply(response);
                return replyResponse;
            }
            catch (err) {
                if (!(err instanceof Error))
                    console.error('Received an error that isnt an Error.');
                error = err;
                if (error) {
                    return { error };
                }
            }
            finally {
                if (runPostCommand) {
                    await this.handlers.postCommand?.({
                        command,
                        interaction,
                        error,
                        inhibited,
                        options
                    });
                }
            }
        }
        return null;
    }
}
exports.MahojiClient = MahojiClient;
//# sourceMappingURL=Mahoji.js.map