import { SlashCommandBuilder } from 'discord.js';
import moderationService from '../../services/moderationService';

export default {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a member.')
    .addUserOption((option) =>
      option.setName('member').setDescription('The member to warn.').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('The reason for the warn.').setRequired(false)
    ),
  async execute(interaction) {
    try {
      const member = interaction.options.getMember('member');
      const reason = interaction.options.getString('reason');

      await moderationService.warnMember(member, reason);
      await interaction.reply({
        content: `Member ${member.user.username} has been warned.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error warning member:', error);
      await interaction.reply({
        content: 'An error occurred while warning the member. Please try again later.',
        ephemeral: true,
      });
    }
  },
};