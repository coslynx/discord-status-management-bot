import { Guild, Interaction, User } from 'discord.js';
import { profileModel } from '../models/profileModel';
import logger from '../utils/logger';

export default class ProfileService {
  async setTheme(userId: string, theme: string): Promise<void> {
    try {
      // Validate input
      if (!userId || !['light', 'dark'].includes(theme)) {
        throw new Error('Invalid input for setting profile theme.');
      }

      // Find the user's profile
      const userProfile = await profileModel.findOne({ userId });

      if (userProfile) {
        // Update the theme
        userProfile.theme = theme;
        await userProfile.save();
      } else {
        // Create a new profile if one doesn't exist
        await profileModel.create({
          userId,
          theme,
          background: null,
          profilePicture: null,
        });
      }

      logger.info(`User ${userId} profile theme updated to ${theme}.`);
    } catch (error) {
      logger.error('Error setting profile theme:', error);
      throw error;
    }
  }

  async setBackground(userId: string, imageUrl: string): Promise<void> {
    try {
      // Validate input
      if (!userId || !imageUrl) {
        throw new Error('Invalid input for setting profile background.');
      }

      // Find the user's profile
      const userProfile = await profileModel.findOne({ userId });

      if (userProfile) {
        // Update the background
        userProfile.background = imageUrl;
        await userProfile.save();
      } else {
        // Create a new profile if one doesn't exist
        await profileModel.create({
          userId,
          theme: 'light',
          background: imageUrl,
          profilePicture: null,
        });
      }

      logger.info(`User ${userId} profile background updated to ${imageUrl}.`);
    } catch (error) {
      logger.error('Error setting profile background:', error);
      throw error;
    }
  }

  async setProfilePicture(userId: string, imageUrl: string): Promise<void> {
    try {
      // Validate input
      if (!userId || !imageUrl) {
        throw new Error('Invalid input for setting profile picture.');
      }

      // Find the user's profile
      const userProfile = await profileModel.findOne({ userId });

      if (userProfile) {
        // Update the profile picture
        userProfile.profilePicture = imageUrl;
        await userProfile.save();
      } else {
        // Create a new profile if one doesn't exist
        await profileModel.create({
          userId,
          theme: 'light',
          background: null,
          profilePicture: imageUrl,
        });
      }

      logger.info(`User ${userId} profile picture updated to ${imageUrl}.`);
    } catch (error) {
      logger.error('Error setting profile picture:', error);
      throw error;
    }
  }
}