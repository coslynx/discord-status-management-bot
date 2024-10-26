import { CronJob } from 'cron';
import { Guild } from 'discord.js';
import { automationModel } from '../models/automationModel';
import logger from '../utils/logger';

export default class AutomationService {
  async scheduleTask(guildId: string, time: string, task: string): Promise<void> {
    try {
      // Validate input
      if (!guildId || !time || !task) {
        throw new Error('Invalid input for scheduling a task.');
      }

      // Check if a task with the same time and task already exists
      const existingTask = await automationModel.findOne({
        guildId,
        time,
        task,
      });

      if (existingTask) {
        throw new Error('A task with the same time and task already exists.');
      }

      // Create a new CronJob
      const job = new CronJob(time, async () => {
        try {
          // Execute the task
          // You will need to implement the logic for executing tasks here
          // Example: if task === 'sendReminder'
          // Send a reminder message to a specific channel

          logger.info(`Task '${task}' executed successfully in guild ${guildId}.`);
        } catch (error) {
          logger.error(`Error executing task '${task}' in guild ${guildId}:`, error);
        }
      });

      // Start the CronJob
      job.start();

      // Store the scheduled task in the database
      await automationModel.create({ guildId, time, task });

      logger.info(`Task '${task}' scheduled successfully in guild ${guildId}.`);
    } catch (error) {
      logger.error('Error scheduling task:', error);
      throw error;
    }
  }

  async setReminder(userId: string, channelId: string, time: string, message: string): Promise<void> {
    try {
      // Validate input
      if (!userId || !channelId || !time || !message) {
        throw new Error('Invalid input for setting a reminder.');
      }

      // Create a new CronJob
      const job = new CronJob(time, async () => {
        try {
          // Send the reminder message
          const channel = await this.client.channels.fetch(channelId);
          if (channel && channel.isTextBased()) {
            await channel.send(`<@${userId}> Reminder: ${message}`);
          } else {
            logger.warn(`Invalid channel ID provided for reminder: ${channelId}`);
          }
        } catch (error) {
          logger.error(`Error sending reminder message:`, error);
        }
      });

      // Start the CronJob
      job.start();

      // Store the reminder in the database
      await automationModel.create({
        userId,
        channelId,
        time,
        message,
      });

      logger.info(`Reminder set for user ${userId} in channel ${channelId}.`);
    } catch (error) {
      logger.error('Error setting reminder:', error);
      throw error;
    }
  }
}