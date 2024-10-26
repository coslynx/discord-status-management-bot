import { Guild, Interaction, User } from 'discord.js';
import logger from '../utils/logger';

export default class InfoService {
  async getServerInfo(guild: Guild): Promise<any> {
    try {
      // Validate input
      if (!guild) {
        throw new Error('Invalid guild provided.');
      }

      // Fetch server information
      const serverInfo = {
        id: guild.id,
        name: guild.name,
        icon: guild.iconURL({ dynamic: true, size: 512 }) || null,
        owner: guild.owner.user.tag,
        memberCount: guild.memberCount,
        createdAt: guild.createdAt.toLocaleString(),
        region: guild.region,
        verificationLevel: guild.verificationLevel,
        boostLevel: guild.premiumTier,
        boostCount: guild.premiumSubscriptionCount,
        channelCount: guild.channels.cache.size,
        roleCount: guild.roles.cache.size,
      };

      logger.info(`Server information retrieved for guild ${guild.id}.`);
      return serverInfo;
    } catch (error) {
      logger.error('Error fetching server information:', error);
      throw error;
    }
  }

  async getUserInfo(member: GuildMember): Promise<any> {
    try {
      // Validate input
      if (!member) {
        throw new Error('Invalid member provided.');
      }

      // Fetch user information
      const userInfo = {
        id: member.user.id,
        tag: member.user.tag,
        avatar: member.user.displayAvatarURL(),
        joinedAt: member.joinedAt.toLocaleString(),
        createdAt: member.user.createdAt.toLocaleString(),
        roles: member.roles.cache.map((role) => role.name).join(', ') || 'None',
        status: member.presence?.status || 'Offline',
        activity: member.presence?.activities?.length > 0
          ? member.presence.activities.map((activity) => activity.name).join(', ')
          : 'None',
      };

      logger.info(`User information retrieved for user ${member.user.id}.`);
      return userInfo;
    } catch (error) {
      logger.error('Error fetching user information:', error);
      throw error;
    }
  }

  async getBotStats(): Promise<any> {
    try {
      // Fetch bot stats (you will need to implement the logic for gathering these stats)
      const stats = {
        serverCount: this.client.guilds.cache.size,
        userCount: this.client.users.cache.size,
        commandCount: 0, // Implement logic to track command executions
        uptime: this.client.uptime, // Get bot uptime
      };

      logger.info('Bot statistics retrieved.');
      return stats;
    } catch (error) {
      logger.error('Error fetching bot stats:', error);
      throw error;
    }
  }
}