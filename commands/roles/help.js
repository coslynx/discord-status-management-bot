import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('roles help')
    .setDescription('Shows a list of available commands for managing roles.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available commands for managing roles:\n\n'
        + '/role create <role name> <permissions> - Create a new role.\n'
        + '/role assign <member id> <role name> - Assign a role to a member.\n'
        + '/role remove <member id> <role name> - Remove a role from a member.',
      ephemeral: true,
    });
  },
};