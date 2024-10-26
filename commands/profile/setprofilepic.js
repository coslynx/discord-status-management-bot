import { SlashCommandBuilder } from 'discord.js';
import profileService from '../../services/profileService';

export default {
  data: new SlashCommandBuilder()
    .setName('setprofilepic')
    .setDescription('Set your profile picture.')
    .addStringOption((option) =>
      option
        .setName('image')
        .setDescription('The URL of the image for your profile picture.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const imageUrl = interaction.options.getString('image');

      await profileService.setProfilePicture(interaction.user.id, imageUrl);

      await interaction.reply({ content: 'Your profile picture has been successfully updated.', ephemeral: true });
    } catch (error) {
      console.error('Error setting profile picture:', error);
      await interaction.reply({ content: 'An error occurred while setting your profile picture. Please try again later.', ephemeral: true });
    }
  },
};