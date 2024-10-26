import { SlashCommandBuilder } from 'discord.js';
import infoService from '../../services/infoService';

export default {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Shows bot statistics.'),
  async execute(interaction) {
    try {
      const stats = await infoService.getBotStats();
      const statsMessage = `
        Bot Statistics:
        - Servers: ${stats.serverCount}
        - Users: ${stats.userCount}
        - Commands Executed: ${stats.commandCount}
        - Uptime: ${stats.uptime}
      `;
      await interaction.reply({ content: statsMessage, ephemeral: true });
    } catch (error) {
      console.error('Error fetching bot stats:', error);
      await interaction.reply({
        content: 'An error occurred while fetching bot stats. Please try again later.',
        ephemeral: true,
      });
    }
  },
};