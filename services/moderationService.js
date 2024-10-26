import { GuildMember, TextChannel } from 'discord.js';
import { moderationModel } from '../models/moderationModel';
import logger from '../utils/logger';

export default class ModerationService {
  client;

  constructor(client) {
    this.client = client;
  }

  async muteMember(member: GuildMember, reason: string | null): Promise<void> {
    try {
      // Validate input
      if (!member) {
        throw new Error('Invalid member provided.');
      }

      // Check if the member is already muted
      if (member.isCommunicationDisabled()) {
        throw new Error('Member is already muted.');
      }

      // Mute the member
      await member.timeout(Infinity, reason);

      // Record the moderation action in the database
      await moderationModel.create({
        guildId: member.guild.id,
        userId: member.id,
        action: 'mute',
        reason,
        timestamp: new Date(),
      });

      logger.info(`Member ${member.user.tag} muted in guild ${member.guild.id}.`);
    } catch (error) {
      logger.error('Error muting member:', error);
      throw error;
    }
  }

  async unmuteMember(member: GuildMember): Promise<void> {
    try {
      // Validate input
      if (!member) {
        throw new Error('Invalid member provided.');
      }

      // Check if the member is muted
      if (!member.isCommunicationDisabled()) {
        throw new Error('Member is not muted.');
      }

      // Unmute the member
      await member.timeout(null);

      // Record the moderation action in the database
      await moderationModel.create({
        guildId: member.guild.id,
        userId: member.id,
        action: 'unmute',
        reason: null,
        timestamp: new Date(),
      });

      logger.info(`Member ${member.user.tag} unmuted in guild ${member.guild.id}.`);
    } catch (error) {
      logger.error('Error unmuting member:', error);
      throw error;
    }
  }

  async kickMember(member: GuildMember, reason: string | null): Promise<void> {
    try {
      // Validate input
      if (!member) {
        throw new Error('Invalid member provided.');
      }

      // Check if the bot has permission to kick members
      if (!member.guild.me.permissions.has('KickMembers')) {
        throw new Error('I do not have permission to kick members.');
      }

      // Kick the member
      await member.kick(reason);

      // Record the moderation action in the database
      await moderationModel.create({
        guildId: member.guild.id,
        userId: member.id,
        action: 'kick',
        reason,
        timestamp: new Date(),
      });

      logger.info(`Member ${member.user.tag} kicked from guild ${member.guild.id}.`);
    } catch (error) {
      logger.error('Error kicking member:', error);
      throw error;
    }
  }

  async banMember(member: GuildMember, reason: string | null): Promise<void> {
    try {
      // Validate input
      if (!member) {
        throw new Error('Invalid member provided.');
      }

      // Check if the bot has permission to ban members
      if (!member.guild.me.permissions.has('BanMembers')) {
        throw new Error('I do not have permission to ban members.');
      }

      // Ban the member
      await member.ban({ reason });

      // Record the moderation action in the database
      await moderationModel.create({
        guildId: member.guild.id,
        userId: member.id,
        action: 'ban',
        reason,
        timestamp: new Date(),
      });

      logger.info(`Member ${member.user.tag} banned from guild ${member.guild.id}.`);
    } catch (error) {
      logger.error('Error banning member:', error);
      throw error;
    }
  }

  async warnMember(member: GuildMember, reason: string | null): Promise<void> {
    try {
      // Validate input
      if (!member) {
        throw new Error('Invalid member provided.');
      }

      // Send a warning message to the member
      const channel = member.guild.systemChannel || member.guild.channels.cache.find(
        (channel) => channel.type === 'GUILD_TEXT'
      ) as TextChannel;

      if (channel) {
        await channel.send(`<@${member.id}>, you have been warned: ${reason || 'No reason provided'}.`);
      } else {
        logger.warn('No suitable channel found for sending the warning message.');
      }

      // Record the moderation action in the database
      await moderationModel.create({
        guildId: member.guild.id,
        userId: member.id,
        action: 'warn',
        reason,
        timestamp: new Date(),
      });

      logger.info(`Member ${member.user.tag} warned in guild ${member.guild.id}.`);
    } catch (error) {
      logger.error('Error warning member:', error);
      throw error;
    }
  }
}