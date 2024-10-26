import { SlashCommandBuilder } from 'discord.js';
import musicService from '../../services/musicService';

export default {
  data: new SlashCommandBuilder()
    .setName('music play')
    .setDescription('Plays a song.')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('The name of the song to play.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const songName = interaction.options.getString('song');

      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) {
        return interaction.reply({ content: 'You need to be in a voice channel to play music.', ephemeral: true });
      }

      await musicService.play(voiceChannel, songName, interaction);

      await interaction.reply({ content: `Now playing: ${songName}`, ephemeral: true });
    } catch (error) {
      console.error('Error playing song:', error);
      await interaction.reply({ content: 'An error occurred while playing the song. Please try again later.', ephemeral: true });
    }
  },
};