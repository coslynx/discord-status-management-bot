import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('profile help')
    .setDescription('Shows a list of available commands for managing your profile.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available commands for managing your profile:\n\n'
        + '/settheme <theme> - Set your profile theme.\n'
        + '/setbackground <image url> - Set your profile background.\n'
        + '/setprofilepic <image url> - Set your profile picture.',
      ephemeral: true,
    });
  },
};