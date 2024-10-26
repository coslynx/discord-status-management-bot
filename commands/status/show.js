import { SlashCommandBuilder } from 'discord.js';
import statusService from '../../services/statusService';

export default {
  data: new SlashCommandBuilder()
    .setName('show status')
    .setDescription('Shows your current status.'),
  async execute(interaction) {
    try {
      const userStatus = await statusService.getUserStatus(interaction.user.id);

      if (userStatus) {
        const statusDetails = `Title: ${userStatus.title || 'None'}\n`;
        if (userStatus.image) {
          statusDetails += `Image: ${userStatus.image}\n`;
        }
        if (userStatus.badge) {
          statusDetails += `Badge: ${userStatus.badge}\n`;
        }
        await interaction.reply({ content: statusDetails, ephemeral: true });
      } else {
        await interaction.reply({ content: 'You currently don\'t have a status set.', ephemeral: true });
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
      await interaction.reply({ content: 'An error occurred while fetching your status. Please try again later.', ephemeral: true });
    }
  },
};