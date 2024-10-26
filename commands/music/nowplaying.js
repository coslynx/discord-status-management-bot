import { SlashCommandBuilder } from 'discord.js';
import musicService from '../../services/musicService';

export default {
  data: new SlashCommandBuilder()
    .setName('music nowplaying')
    .setDescription('Shows the currently playing song.'),
  async execute(interaction) {
    try {
      const currentlyPlaying = await musicService.getNowPlaying(interaction.guild.id);

      if (currentlyPlaying) {
        await interaction.reply({
          content: `Now Playing: ${currentlyPlaying.title} by ${currentlyPlaying.artist}`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There is no song currently playing.',
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error('Error getting now playing song:', error);
      await interaction.reply({
        content: 'An error occurred while fetching the now playing song. Please try again later.',
        ephemeral: true,
      });
    }
  },
};