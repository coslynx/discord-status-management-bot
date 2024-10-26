import { SlashCommandBuilder } from 'discord.js';
import moderationService from '../../services/moderationService';

export default {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes a member from the server.')
    .addUserOption((option) =>
      option.setName('member').setDescription('The member to mute.').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('The reason for the mute.').setRequired(false)
    ),
  async execute(interaction) {
    try {
      const member = interaction.options.getMember('member');
      const reason = interaction.options.getString('reason');

      await moderationService.muteMember(member, reason);
      await interaction.reply({
        content: `Member ${member.user.username} has been muted.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error muting member:', error);
      await interaction.reply({
        content: 'An error occurred while muting the member. Please try again later.',
        ephemeral: true,
      });
    }
  },
};