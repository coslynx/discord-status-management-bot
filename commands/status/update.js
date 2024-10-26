import { SlashCommandBuilder } from 'discord.js';
import statusService from '../../services/statusService';

export default {
  data: new SlashCommandBuilder()
    .setName('update status')
    .setDescription('Updates your existing status.')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('New title for your status.')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('image')
        .setDescription('New image URL for your status.')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('badge')
        .setDescription('New badge for your status.')
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const title = interaction.options.getString('title');
      const image = interaction.options.getString('image');
      const badge = interaction.options.getString('badge');

      await statusService.updateUserStatus(
        interaction.user.id,
        title,
        image,
        badge
      );

      await interaction.reply({
        content: 'Your status has been successfully updated.',
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      await interaction.reply({
        content: 'An error occurred while updating your status. Please try again later.',
        ephemeral: true,
      });
    }
  },
};