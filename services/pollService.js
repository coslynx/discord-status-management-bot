import { Guild, Interaction, User } from 'discord.js';
import { pollModel } from '../models/pollModel';
import logger from '../utils/logger';

export default class PollService {
  async createPoll(guildId: string, question: string, options: string[]): Promise<any> {
    try {
      // Validate input
      if (!guildId || !question || options.length < 2) {
        throw new Error('Invalid input for creating a poll.');
      }

      // Create a new poll
      const newPoll = await pollModel.create({
        guildId,
        question,
        options,
        votes: {},
      });

      // Initialize votes for each option
      for (const option of options) {
        newPoll.votes[option] = 0;
      }

      // Save the poll
      await newPoll.save();

      logger.info(`Poll '${question}' created successfully in guild ${guildId}.`);

      return newPoll;
    } catch (error) {
      logger.error('Error creating poll:', error);
      throw error;
    }
  }

  async voteInPoll(pollId: string, userId: string, option: string): Promise<void> {
    try {
      // Validate input
      if (!pollId || !userId || !option) {
        throw new Error('Invalid input for voting in a poll.');
      }

      // Find the poll
      const poll = await pollModel.findById(pollId);

      if (!poll) {
        throw new Error('Poll not found.');
      }

      // Check if the user has already voted
      if (poll.votes[userId]) {
        throw new Error('You have already voted in this poll.');
      }

      // Check if the option is valid
      if (!poll.options.includes(option)) {
        throw new Error('Invalid option.');
      }

      // Increment the vote count for the selected option
      poll.votes[userId] = option;
      poll.votes[option]++;

      // Save the poll
      await poll.save();

      logger.info(`User ${userId} voted for option '${option}' in poll ${pollId}.`);
    } catch (error) {
      logger.error('Error voting in poll:', error);
      throw error;
    }
  }

  async getPollById(pollId: string): Promise<any> {
    try {
      // Validate input
      if (!pollId) {
        throw new Error('Invalid input for fetching a poll.');
      }

      // Find the poll
      const poll = await pollModel.findById(pollId);

      if (!poll) {
        throw new Error('Poll not found.');
      }

      return poll;
    } catch (error) {
      logger.error('Error fetching poll:', error);
      throw error;
    }
  }
}