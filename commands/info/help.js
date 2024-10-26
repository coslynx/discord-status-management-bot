import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('info help')
    .setDescription('Shows a list of available commands for retrieving information.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available commands for retrieving information:\n\n'
        + '/serverinfo - Show server information.\n'
        + '/userinfo <member id> - Show user information.\n'
        + '/stats - Show bot stats.',
      ephemeral: true,
    });
  },
};