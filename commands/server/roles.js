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
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('assign')
        .setDescription('Assign a role to a member.')
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('The role to assign.')
            .setRequired(true)
        )
        .addUserOption((option) =>
          option
            .setName('member')
            .setDescription('The member to assign the role to.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remove')
        .setDescription('Remove a role from a member.')
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('The role to remove.')
            .setRequired(true)
        )
        .addUserOption((option) =>
          option
            .setName('member')
            .setDescription('The member to remove the role from.')
            .setRequired(true)
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
      } else if (subcommand === 'assign') {
        const role = interaction.options.getRole('role');
        const member = interaction.options.getMember('member');

        await serverService.assignRole(member, role);
        await interaction.reply({ content: `Role ${role.name} assigned to ${member.user.username} successfully.`, ephemeral: true });
      } else if (subcommand === 'remove') {
        const role = interaction.options.getRole('role');
        const member = interaction.options.getMember('member');

        await serverService.removeRole(member, role);
        await interaction.reply({ content: `Role ${role.name} removed from ${member.user.username} successfully.`, ephemeral: true });
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