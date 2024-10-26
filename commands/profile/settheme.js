import { SlashCommandBuilder } from 'discord.js';
import profileService from '../../services/profileService';

export default {
  data: new SlashCommandBuilder()
    .setName('settheme')
    .setDescription('Set your profile theme.')
    .addStringOption((option) =>
      option
        .setName('theme')
        .setDescription('The theme for your profile.')
        .setRequired(true)
        .addChoices(
          { name: 'Light', value: 'light' },
          { name: 'Dark', value: 'dark' }
        )
    ),
  async execute(interaction) {
    try {
      const theme = interaction.options.getString('theme');

      await profileService.setTheme(interaction.user.id, theme);

      await interaction.reply({ content: 'Your profile theme has been successfully updated.', ephemeral: true });
    } catch (error) {
      console.error('Error setting profile theme:', error);
      await interaction.reply({ content: 'An error occurred while setting your profile theme. Please try again later.', ephemeral: true });
    }
  },
};