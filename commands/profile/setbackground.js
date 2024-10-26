import { SlashCommandBuilder } from 'discord.js';
import profileService from '../../services/profileService';

export default {
  data: new SlashCommandBuilder()
    .setName('setbackground')
    .setDescription('Set your profile background.')
    .addStringOption((option) =>
      option
        .setName('image')
        .setDescription('The URL of the image for your profile background.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const imageUrl = interaction.options.getString('image');

      await profileService.setBackground(interaction.user.id, imageUrl);

      await interaction.reply({ content: 'Your profile background has been successfully updated.', ephemeral: true });
    } catch (error) {
      console.error('Error setting profile background:', error);
      await interaction.reply({ content: 'An error occurred while setting your profile background. Please try again later.', ephemeral: true });
    }
  },
};