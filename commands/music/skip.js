import { SlashCommandBuilder } from 'discord.js';
import musicService from '../../services/musicService';

export default {
  data: new SlashCommandBuilder()
    .setName('music skip')
    .setDescription('Skips the current song.'),
  async execute(interaction) {
    try {
      await musicService.skip(interaction.guild.id);
      await interaction.reply({ content: 'Skipped to the next song.', ephemeral: true });
    } catch (error) {
      console.error('Error skipping song:', error);
      await interaction.reply({
        content: 'An error occurred while skipping the song. Please try again later.',
        ephemeral: true,
      });
    }
  },
};