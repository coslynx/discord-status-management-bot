import { SlashCommandBuilder } from 'discord.js';
import automationService from '../../services/automationService';

export default {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Schedules a task.')
    .addStringOption((option) =>
      option
        .setName('time')
        .setDescription('The time for the task (e.g., 10m, 1h, 2d).')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('task')
        .setDescription('The task to schedule.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const time = interaction.options.getString('time');
      const task = interaction.options.getString('task');

      await automationService.scheduleTask(
        interaction.guild.id,
        time,
        task
      );

      await interaction.reply({ content: `Task scheduled for ${time}.`, ephemeral: true });
    } catch (error) {
      console.error('Error scheduling task:', error);
      await interaction.reply({ content: 'An error occurred while scheduling the task. Please try again later.', ephemeral: true });
    }
  },
};