import { Guild, Interaction, Role, TextChannel, VoiceChannel } from 'discord.js';
import { serverModel } from '../models/serverModel';
import logger from '../utils/logger';

export default class ServerService {
  client;

  constructor(client) {
    this.client = client;
  }

  async setServerSetting(
    guildId: string,
    setting: string,
    value: string
  ): Promise<void> {
    try {
      // Validate input
      if (!guildId || !setting || !value) {
        throw new Error('Invalid input for setting server settings.');
      }

      // Find the server in the database
      const server = await serverModel.findOne({ guildId });

      if (server) {
        // Update the server setting
        server[setting] = value;
        await server.save();
      } else {
        // Create a new server entry if one doesn't exist
        await serverModel.create({
          guildId,
          welcomeMessage: null,
          welcomeChannel: null,
          loggingChannel: null,
          defaultRole: null,
          autoRole: null,
          [setting]: value,
        });
      }

      logger.info(
        `Server setting '${setting}' updated to '${value}' in guild ${guildId}.`
      );
    } catch (error) {
      logger.error('Error setting server setting:', error);
      throw error;
    }
  }

  async createRole(
    guild: Guild,
    name: string,
    permissions: string | null
  ): Promise<Role> {
    try {
      // Validate input
      if (!guild || !name) {
        throw new Error('Invalid input for creating a role.');
      }

      // Create a new role with the specified name and permissions
      const newRole = await guild.roles.create({
        name,
        permissions: permissions
          ? permissions.split(',').map((permission) => permission.trim())
          : [],
      });

      // Store the created role in the database
      await serverModel.findOneAndUpdate(
        { guildId: guild.id },
        {
          $push: {
            roles: {
              roleId: newRole.id,
              name: newRole.name,
              permissions: newRole.permissions
                .toArray()
                .map((permission) => permission.toString()),
            },
          },
        }
      );

      logger.info(`Role '${name}' created successfully in guild ${guild.id}.`);

      return newRole;
    } catch (error) {
      logger.error('Error creating role:', error);
      throw error;
    }
  }

  async assignRole(member: GuildMember, role: Role): Promise<void> {
    try {
      // Validate input
      if (!member || !role) {
        throw new Error('Invalid input for assigning a role.');
      }

      // Add the role to the member
      await member.roles.add(role);

      logger.info(
        `Role '${role.name}' assigned to member ${member.user.username} in guild ${member.guild.id}.`
      );
    } catch (error) {
      logger.error('Error assigning role:', error);
      throw error;
    }
  }

  async removeRole(member: GuildMember, role: Role): Promise<void> {
    try {
      // Validate input
      if (!member || !role) {
        throw new Error('Invalid input for removing a role.');
      }

      // Remove the role from the member
      await member.roles.remove(role);

      logger.info(
        `Role '${role.name}' removed from member ${member.user.username} in guild ${member.guild.id}.`
      );
    } catch (error) {
      logger.error('Error removing role:', error);
      throw error;
    }
  }

  async createChannel(
    guild: Guild,
    name: string,
    type: string
  ): Promise<TextChannel | VoiceChannel> {
    try {
      // Validate input
      if (!guild || !name || !['text', 'voice'].includes(type)) {
        throw new Error('Invalid input for creating a channel.');
      }

      // Create a new channel with the specified name and type
      const newChannel = await guild.channels.create(name, {
        type: type === 'text' ? 'GUILD_TEXT' : 'GUILD_VOICE',
      });

      // Store the created channel in the database
      await serverModel.findOneAndUpdate(
        { guildId: guild.id },
        {
          $push: {
            channels: {
              channelId: newChannel.id,
              name: newChannel.name,
              type: newChannel.type,
            },
          },
        }
      );

      logger.info(
        `Channel '${name}' created successfully in guild ${guild.id}.`
      );

      return newChannel;
    } catch (error) {
      logger.error('Error creating channel:', error);
      throw error;
    }
  }

  async deleteChannel(channel: TextChannel | VoiceChannel): Promise<void> {
    try {
      // Validate input
      if (!channel) {
        throw new Error('Invalid channel provided.');
      }

      // Delete the channel
      await channel.delete();

      // Remove the channel from the database
      await serverModel.findOneAndUpdate(
        { guildId: channel.guild.id },
        {
          $pull: {
            channels: { channelId: channel.id },
          },
        }
      );

      logger.info(
        `Channel '${channel.name}' deleted successfully from guild ${channel.guild.id}.`
      );
    } catch (error) {
      logger.error('Error deleting channel:', error);
      throw error;
    }
  }

  async updateChannel(
    channel: TextChannel | VoiceChannel,
    newName: string | null,
    newTopic: string | null
  ): Promise<void> {
    try {
      // Validate input
      if (!channel) {
        throw new Error('Invalid channel provided.');
      }

      // Update the channel's name and/or topic
      if (newName) {
        await channel.setName(newName);
      }
      if (newTopic) {
        await channel.setTopic(newTopic);
      }

      // Update the channel information in the database
      await serverModel.findOneAndUpdate(
        { guildId: channel.guild.id, 'channels.channelId': channel.id },
        {
          $set: {
            'channels.$.name': newName || channel.name,
            'channels.$.topic': newTopic || channel.topic,
          },
        }
      );

      logger.info(
        `Channel '${channel.name}' updated successfully in guild ${channel.guild.id}.`
      );
    } catch (error) {
      logger.error('Error updating channel:', error);
      throw error;
    }
  }
}