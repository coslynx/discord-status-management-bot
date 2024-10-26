import { SlashCommandBuilder } from 'discord.js';
import serverService from '../../services/serverService';

export default {
  data: new SlashCommandBuilder()
    .setName('server roles')
    .setDescription('Manage server roles.')
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
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const guild = interaction.guild;

      if (subcommand === 'assign') {
        const role = interaction.options.getRole('role');
        const member = interaction.options.getMember('member');

        await serverService.assignRole(member, role);
        await interaction.reply({ content: `Role ${role.name} assigned to ${member.user.username} successfully.`, ephemeral: true });
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