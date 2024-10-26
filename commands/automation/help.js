import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('automation help')
    .setDescription('Shows a list of available automation commands.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available automation commands:\n\n'
        + '/schedule <time> <task> - Schedule a task.\n'
        + '/remind <time> <message> - Set a reminder.',
      ephemeral: true,
    });
  },
};