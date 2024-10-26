import { SlashCommandBuilder } from 'discord.js';
import serverService from '../../services/serverService';

export default {
  data: new SlashCommandBuilder()
    .setName('server roles')
    .setDescription('Manage server roles.')
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

      if (subcommand === 'remove') {
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