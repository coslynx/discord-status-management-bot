import { SlashCommandBuilder } from 'discord.js';
import statusService from '../../services/statusService';

export default {
  data: new SlashCommandBuilder()
    .setName('remove status')
    .setDescription('Removes your current status.'),
  async execute(interaction) {
    try {
      await statusService.removeUserStatus(interaction.user.id);
      await interaction.reply({ content: 'Your status has been successfully removed.', ephemeral: true });
    } catch (error) {
      console.error('Error removing user status:', error);
      await interaction.reply({ content: 'An error occurred while removing your status. Please try again later.', ephemeral: true });
    }
  },
};