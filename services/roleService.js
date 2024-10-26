import { GuildMember, Role } from 'discord.js';
import { roleModel } from '../models/roleModel';
import logger from '../utils/logger';

export default class RoleService {
  async createRole(guild: Guild, name: string, permissions: string | null): Promise<Role> {
    try {
      // Validate input
      if (!guild || !name) {
        throw new Error('Invalid input for creating a role.');
      }

      // Create a new role with the specified name and permissions
      const newRole = await guild.roles.create({
        name,
        permissions: permissions ? permissions.split(',').map((permission) => permission.trim()) : [],
      });

      // Store the created role in the database
      await roleModel.create({
        guildId: guild.id,
        roleId: newRole.id,
        name: newRole.name,
        permissions: newRole.permissions.toArray().map((permission) => permission.toString()),
      });

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

      logger.info(`Role '${role.name}' assigned to member ${member.user.username} in guild ${member.guild.id}.`);
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

      logger.info(`Role '${role.name}' removed from member ${member.user.username} in guild ${member.guild.id}.`);
    } catch (error) {
      logger.error('Error removing role:', error);
      throw error;
    }
  }
}