import { SlashCommandBuilder } from 'discord.js';
import statusService from '../../services/statusService';

export default {
  data: new SlashCommandBuilder()
    .setName('set status')
    .setDescription('Set a custom status with a title, image, and optional badge.')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('The title for your status.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('image')
        .setDescription('The URL of the image for your status.')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('badge')
        .setDescription('The badge for your status.')
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const title = interaction.options.getString('title');
      const image = interaction.options.getString('image');
      const badge = interaction.options.getString('badge');

      await statusService.createUserStatus(
        interaction.user.id,
        title,
        image,
        badge
      );

      await interaction.reply({
        content: 'Your status has been successfully set.',
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error setting user status:', error);
      await interaction.reply({
        content: 'An error occurred while setting your status. Please try again later.',
        ephemeral: true,
      });
    }
  },
};