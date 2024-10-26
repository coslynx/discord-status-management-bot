import { SlashCommandBuilder } from 'discord.js';
import moderationService from '../../services/moderationService';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member from the server.')
    .addUserOption((option) =>
      option.setName('member').setDescription('The member to kick.').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('The reason for the kick.').setRequired(false)
    ),
  async execute(interaction) {
    try {
      const member = interaction.options.getMember('member');
      const reason = interaction.options.getString('reason');

      await moderationService.kickMember(member, reason);
      await interaction.reply({
        content: `Member ${member.user.username} has been kicked.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error kicking member:', error);
      await interaction.reply({
        content: 'An error occurred while kicking the member. Please try again later.',
        ephemeral: true,
      });
    }
  },
};