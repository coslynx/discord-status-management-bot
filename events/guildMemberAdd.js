import { GuildMember } from 'discord.js';
import statusService from '../../services/statusService';

export default async (oldMember: GuildMember, newMember: GuildMember) => {
  try {
    // Only process updates related to user status
    if (oldMember.presence.activities.length !== newMember.presence.activities.length) {
      const oldStatus = oldMember.presence.activities[0]?.name || null;
      const newStatus = newMember.presence.activities[0]?.name || null;

      // Check if the user's status has changed
      if (oldStatus !== newStatus) {
        // Update user's status in the database
        await statusService.updateUserStatus(newMember.id, newStatus, null, null);
      }
    }
  } catch (error) {
    console.error('Error handling guildMemberUpdate event:', error);
  }
};