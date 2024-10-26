import { SlashCommandBuilder } from 'discord.js';
import automationService from '../../services/automationService';

export default {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Sets a reminder.')
    .addStringOption((option) =>
      option
        .setName('time')
        .setDescription('The time for the reminder (e.g., 10m, 1h, 2d).')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The message for the reminder.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const time = interaction.options.getString('time');
      const message = interaction.options.getString('message');

      await automationService.setReminder(interaction.user.id, interaction.channel.id, time, message);

      await interaction.reply({ content: `Reminder set for ${time}.`, ephemeral: true });
    } catch (error) {
      console.error('Error setting reminder:', error);
      await interaction.reply({ content: 'An error occurred while setting the reminder. Please try again later.', ephemeral: true });
    }
  },
};