import { SlashCommandBuilder } from 'discord.js';
import musicService from '../../services/musicService';

export default {
  data: new SlashCommandBuilder()
    .setName('music queue')
    .setDescription('Shows the current music queue.'),
  async execute(interaction) {
    try {
      const queue = await musicService.getQueue(interaction.guild.id);

      if (queue.length > 0) {
        const queueMessage = `Current Queue:\n${queue
          .map((song, index) => `${index + 1}. ${song.title} by ${song.artist}`)
          .join('\n')}`;
        await interaction.reply({ content: queueMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: 'The queue is empty.', ephemeral: true });
      }
    } catch (error) {
      console.error('Error getting music queue:', error);
      await interaction.reply({
        content: 'An error occurred while fetching the music queue. Please try again later.',
        ephemeral: true,
      });
    }
  },
};