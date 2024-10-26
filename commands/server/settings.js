import { SlashCommandBuilder } from 'discord.js';
import serverService from '../../services/serverService';

export default {
  data: new SlashCommandBuilder()
    .setName('server settings')
    .setDescription('Manage server settings.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('set')
        .setDescription('Set a server setting.')
        .addStringOption((option) =>
          option
            .setName('setting')
            .setDescription('The setting to modify.')
            .setRequired(true)
            .addChoices(
              { name: 'Welcome Message', value: 'welcomeMessage' },
              { name: 'Welcome Channel', value: 'welcomeChannel' },
              { name: 'Logging Channel', value: 'loggingChannel' },
              { name: 'Default Role', value: 'defaultRole' },
              { name: 'Auto Role', value: 'autoRole' }
            )
        )
        .addStringOption((option) =>
          option
            .setName('value')
            .setDescription('The new value for the setting.')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const guild = interaction.guild;

      if (subcommand === 'set') {
        const setting = interaction.options.getString('setting');
        const value = interaction.options.getString('value');

        await serverService.setServerSetting(guild.id, setting, value);
        await interaction.reply({ content: `Server setting ${setting} updated successfully.`, ephemeral: true });
      }
    } catch (error) {
      console.error('Error managing server settings:', error);
      await interaction.reply({
        content: 'An error occurred while managing server settings. Please try again later.',
        ephemeral: true,
      });
    }
  },
};