import { SlashCommandBuilder } from 'discord.js';
import moderationService from '../../services/moderationService';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member from the server.')
    .addUserOption((option) =>
      option.setName('member').setDescription('The member to ban.').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('The reason for the ban.').setRequired(false)
    ),
  async execute(interaction) {
    try {
      const member = interaction.options.getMember('member');
      const reason = interaction.options.getString('reason');

      await moderationService.banMember(member, reason);
      await interaction.reply({
        content: `Member ${member.user.username} has been banned.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error banning member:', error);
      await interaction.reply({
        content: 'An error occurred while banning the member. Please try again later.',
        ephemeral: true,
      });
    }
  },
};