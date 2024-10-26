import { User } from 'discord.js';
import { statusModel } from '../models/statusModel';
import logger from '../utils/logger';

export default class StatusService {
  async createUserStatus(
    userId: string,
    title: string,
    image: string | null,
    badge: string | null,
  ): Promise<void> {
    try {
      // Validate input
      if (!userId || !title) {
        throw new Error('Invalid input for creating user status.');
      }

      // Check if user already has a status
      const existingStatus = await statusModel.findOne({ userId });

      if (existingStatus) {
        throw new Error('User already has a status set.');
      }

      // Create a new status entry
      await statusModel.create({
        userId,
        title,
        image,
        badge,
      });

      logger.info(`User status created for user ${userId}.`);
    } catch (error) {
      logger.error('Error creating user status:', error);
      throw error;
    }
  }

  async updateUserStatus(
    userId: string,
    title: string | null,
    image: string | null,
    badge: string | null,
  ): Promise<void> {
    try {
      // Validate input
      if (!userId) {
        throw new Error('Invalid input for updating user status.');
      }

      // Find the user's status
      const userStatus = await statusModel.findOne({ userId });

      if (userStatus) {
        // Update the status fields
        if (title) {
          userStatus.title = title;
        }
        if (image) {
          userStatus.image = image;
        }
        if (badge) {
          userStatus.badge = badge;
        }

        // Save the updated status
        await userStatus.save();

        logger.info(`User status updated for user ${userId}.`);
      } else {
        throw new Error('User status not found.');
      }
    } catch (error) {
      logger.error('Error updating user status:', error);
      throw error;
    }
  }

  async removeUserStatus(userId: string): Promise<void> {
    try {
      // Validate input
      if (!userId) {
        throw new Error('Invalid input for removing user status.');
      }

      // Delete the user's status
      await statusModel.deleteOne({ userId });

      logger.info(`User status removed for user ${userId}.`);
    } catch (error) {
      logger.error('Error removing user status:', error);
      throw error;
    }
  }

  async getUserStatus(userId: string): Promise<any | null> {
    try {
      // Validate input
      if (!userId) {
        throw new Error('Invalid input for fetching user status.');
      }

      // Find the user's status
      const userStatus = await statusModel.findOne({ userId });

      return userStatus;
    } catch (error) {
      logger.error('Error fetching user status:', error);
      throw error;
    }
  }
}