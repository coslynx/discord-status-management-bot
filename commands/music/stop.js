import { SlashCommandBuilder } from 'discord.js';
import musicService from '../../services/musicService';

export default {
  data: new SlashCommandBuilder()
    .setName('music stop')
    .setDescription('Stops music playback.'),
  async execute(interaction) {
    try {
      await musicService.stop(interaction.guild.id);
      await interaction.reply({ content: 'Music playback stopped.', ephemeral: true });
    } catch (error) {
      console.error('Error stopping music playback:', error);
      await interaction.reply({
        content: 'An error occurred while stopping music playback. Please try again later.',
        ephemeral: true,
      });
    }
  },
};