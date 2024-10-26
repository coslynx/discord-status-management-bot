import { SlashCommandBuilder } from 'discord.js';
import moderationService from '../../services/moderationService';

export default {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmutes a member from the server.')
    .addUserOption((option) =>
      option.setName('member').setDescription('The member to unmute.').setRequired(true)
    ),
  async execute(interaction) {
    try {
      const member = interaction.options.getMember('member');

      await moderationService.unmuteMember(member);
      await interaction.reply({
        content: `Member ${member.user.username} has been unmuted.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error unmuting member:', error);
      await interaction.reply({
        content: 'An error occurred while unmuting the member. Please try again later.',
        ephemeral: true,
      });
    }
  },
};