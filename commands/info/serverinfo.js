import { SlashCommandBuilder } from 'discord.js';
import infoService from '../../services/infoService';

export default {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Shows information about the current server.'),
  async execute(interaction) {
    try {
      const guild = interaction.guild;

      const serverInfo = await infoService.getServerInfo(guild);

      const embed = {
        color: 0x00c6ff,
        title: `${guild.name}`,
        thumbnail: {
          url: guild.iconURL({ dynamic: true, size: 512 }) || null,
        },
        fields: [
          { name: 'ID', value: guild.id, inline: true },
          { name: 'Owner', value: guild.owner.user.tag, inline: true },
          { name: 'Members', value: guild.memberCount, inline: true },
          { name: 'Created At', value: guild.createdAt.toLocaleString(), inline: true },
          { name: 'Region', value: guild.region, inline: true },
          { name: 'Verification Level', value: guild.verificationLevel, inline: true },
          { name: 'Boost Level', value: guild.premiumTier, inline: true },
          { name: 'Boost Count', value: guild.premiumSubscriptionCount, inline: true },
          { name: 'Channels', value: guild.channels.cache.size, inline: true },
          { name: 'Roles', value: guild.roles.cache.size, inline: true },
        ],
      };

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Error fetching server information:', error);
      await interaction.reply({
        content: 'An error occurred while fetching server information. Please try again later.',
        ephemeral: true,
      });
    }
  },
};