import { SlashCommandBuilder } from 'discord.js';
import pollService from '../../services/pollService';

export default {
  data: new SlashCommandBuilder()
    .setName('poll create')
    .setDescription('Create a new poll.')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('The question for your poll.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('options')
        .setDescription('The options for your poll (comma-separated).')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const question = interaction.options.getString('question');
      const options = interaction.options.getString('options')
        .split(',')
        .map((option) => option.trim());

      const poll = await pollService.createPoll(interaction.guild.id, question, options);

      await interaction.reply({
        content: `Poll created successfully! ID: ${poll._id}. Use /vote to vote.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error creating poll:', error);
      await interaction.reply({
        content: 'An error occurred while creating the poll. Please try again later.',
        ephemeral: true,
      });
    }
  },
};