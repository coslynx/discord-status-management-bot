import { SlashCommandBuilder } from 'discord.js';
import musicService from '../../services/musicService';

export default {
  data: new SlashCommandBuilder()
    .setName('music loop')
    .setDescription('Loops the current song or the entire queue.')
    .addStringOption((option) =>
      option
        .setName('mode')
        .setDescription('The loop mode.')
        .setRequired(true)
        .addChoices(
          { name: 'Song', value: 'song' },
          { name: 'Queue', value: 'queue' },
          { name: 'Off', value: 'off' }
        )
    ),
  async execute(interaction) {
    try {
      const mode = interaction.options.getString('mode');
      const guildId = interaction.guild.id;

      await musicService.setLoopMode(guildId, mode);

      let responseMessage;

      switch (mode) {
        case 'song':
          responseMessage = 'Looping the current song.';
          break;
        case 'queue':
          responseMessage = 'Looping the entire queue.';
          break;
        case 'off':
          responseMessage = 'Looping is now off.';
          break;
        default:
          responseMessage = 'Invalid loop mode.';
      }

      await interaction.reply({ content: responseMessage, ephemeral: true });
    } catch (error) {
      console.error('Error setting loop mode:', error);
      await interaction.reply({
        content: 'An error occurred while setting the loop mode. Please try again later.',
        ephemeral: true,
      });
    }
  },
};