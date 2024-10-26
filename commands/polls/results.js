import { SlashCommandBuilder } from 'discord.js';
import pollService from '../../services/pollService';

export default {
  data: new SlashCommandBuilder()
    .setName('poll results')
    .setDescription('Show results for a poll.')
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription('The ID of the poll to view results for.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const pollId = interaction.options.getString('id');
      const poll = await pollService.getPollById(pollId);

      if (!poll) {
        return interaction.reply({
          content: `No poll found with ID: ${pollId}.`,
          ephemeral: true,
        });
      }

      let resultsMessage = `Poll Results for: ${poll.question}\n\n`;

      for (const option of poll.options) {
        const votes = poll.votes[option];
        resultsMessage += `${option}: ${votes} vote${votes > 1 ? 's' : ''}\n`;
      }

      await interaction.reply({ content: resultsMessage, ephemeral: true });
    } catch (error) {
      console.error('Error fetching poll results:', error);
      await interaction.reply({
        content: 'An error occurred while fetching poll results. Please try again later.',
        ephemeral: true,
      });
    }
  },
};