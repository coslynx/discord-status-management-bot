import { SlashCommandBuilder } from 'discord.js';
import infoService from '../../services/infoService';

export default {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Shows information about a user.')
    .addUserOption((option) =>
      option.setName('member').setDescription('The user to get information for.').setRequired(false)
    ),
  async execute(interaction) {
    try {
      const member = interaction.options.getMember('member') || interaction.member;

      const userInfo = await infoService.getUserInfo(member);

      const embed = {
        color: 0x00c6ff,
        title: `${member.user.tag}`,
        thumbnail: {
          url: member.user.displayAvatarURL(),
        },
        fields: [
          { name: 'ID', value: member.user.id, inline: true },
          { name: 'Joined Server', value: member.joinedAt.toLocaleString(), inline: true },
          { name: 'Created Account', value: member.user.createdAt.toLocaleString(), inline: true },
          { name: 'Roles', value: member.roles.cache.map((role) => role.name).join(', ') || 'None', inline: true },
          { name: 'Status', value: member.presence?.status || 'Offline', inline: true },
          { name: 'Activity', value: member.presence?.activities?.length > 0
            ? member.presence.activities.map((activity) => activity.name).join(', ')
            : 'None', inline: true },
        ],
      };

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Error fetching user information:', error);
      await interaction.reply({ content: 'An error occurred while fetching user information. Please try again later.', ephemeral: true });
    }
  },
};