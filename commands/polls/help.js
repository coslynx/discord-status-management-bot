import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('polls help')
    .setDescription('Shows a list of available commands for creating, voting, and viewing poll results.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available commands for managing polls:\n\n'
        + '/poll create <question> <options> - Create a new poll.\n'
        + '/vote <poll id> <option> - Vote in a poll.\n'
        + '/poll results <poll id> - Show poll results.',
      ephemeral: true,
    });
  },
};