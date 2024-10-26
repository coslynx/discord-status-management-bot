import { SlashCommandBuilder } from 'discord.js';
import pollService from '../../services/pollService';

export default {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote in a poll.')
    .addStringOption((option) =>
      option
        .setName('poll_id')
        .setDescription('The ID of the poll to vote in.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('option')
        .setDescription('The option to vote for.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const pollId = interaction.options.getString('poll_id');
      const option = interaction.options.getString('option');

      await pollService.voteInPoll(pollId, interaction.user.id, option);

      await interaction.reply({ content: 'Your vote has been recorded.', ephemeral: true });
    } catch (error) {
      console.error('Error voting in poll:', error);
      await interaction.reply({
        content: 'An error occurred while voting. Please try again later.',
        ephemeral: true,
      });
    }
  },
};