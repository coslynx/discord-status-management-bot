import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('music help')
    .setDescription('Shows a list of available music commands.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available music commands:\n\n'
        + '/music play <song name> - Play a song.\n'
        + '/music skip - Skip the current song.\n'
        + '/music stop - Stop music playback.\n'
        + '/music queue - Show the music queue.\n'
        + '/music loop - Loop the current song or queue.\n'
        + '/music nowplaying - Show the currently playing song.',
      ephemeral: true,
    });
  },
};