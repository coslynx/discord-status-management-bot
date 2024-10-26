import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('server help')
    .setDescription('Shows a list of available commands for managing your server.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available commands for managing your server:\n\n'
        + '/server settings <setting> <value> - Set server settings.\n'
        + '/server roles <action> <role name> <member id> - Manage server roles.\n'
        + '/server channels <action> <channel name> <channel type> - Manage server channels.',
      ephemeral: true,
    });
  },
};