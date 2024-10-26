import { SlashCommandBuilder } from 'discord.js';
import serverService from '../../services/serverService';

export default {
  data: new SlashCommandBuilder()
    .setName('server roles')
    .setDescription('Manage server roles.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('create')
        .setDescription('Create a new role.')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The name of the new role.')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('permissions')
            .setDescription('The permissions for the new role (comma-separated).')
            .setRequired(false)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const guild = interaction.guild;

      if (subcommand === 'create') {
        const name = interaction.options.getString('name');
        const permissions = interaction.options.getString('permissions');

        const role = await serverService.createRole(guild, name, permissions);
        await interaction.reply({ content: `Role ${name} created successfully.`, ephemeral: true });
      }
    } catch (error) {
      console.error('Error managing server roles:', error);
      await interaction.reply({
        content: 'An error occurred while managing server roles. Please try again later.',
        ephemeral: true,
      });
    }
  },
};