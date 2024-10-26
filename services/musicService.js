import { VoiceChannel, Guild, Message, Interaction, VoiceConnection, User } from 'discord.js';
import ytdl from 'ytdl-core';
import { musicQueueModel } from '../models/musicQueueModel';
import logger from '../utils/logger';

export default class MusicService {
  client;

  constructor(client) {
    this.client = client;
  }

  async play(voiceChannel: VoiceChannel, songName: string, interaction: Interaction): Promise<void> {
    try {
      // Check if the bot is already in a voice channel
      if (voiceChannel.members.me) {
        return interaction.reply({ content: 'I am already in a voice channel.', ephemeral: true });
      }

      // Join the voice channel
      const connection = await voiceChannel.join();

      // Get the song information from YouTube
      const songInfo = await ytdl.getInfo(songName);

      // Add the song to the queue
      await this.addToQueue(songInfo, interaction.guild.id);

      // Play the song
      this.playNext(connection, interaction.guild.id);
    } catch (error) {
      console.error('Error playing song:', error);
      await interaction.reply({ content: 'An error occurred while playing the song. Please try again later.', ephemeral: true });
    }
  }

  async addToQueue(songInfo, guildId: string): Promise<void> {
    try {
      // Create a new queue entry
      const newSong = {
        title: songInfo.videoDetails.title,
        artist: songInfo.videoDetails.author.name,
        url: songInfo.videoDetails.video_url,
        thumbnail: songInfo.videoDetails.thumbnails[0].url,
      };

      // Find the queue for the guild
      const queue = await musicQueueModel.findOne({ guildId });

      if (queue) {
        // Add the song to the existing queue
        queue.queue.push(newSong);
        await queue.save();
      } else {
        // Create a new queue for the guild
        await musicQueueModel.create({
          guildId,
          queue: [newSong],
          loopMode: 'off',
        });
      }
    } catch (error) {
      logger.error('Error adding song to queue:', error);
    }
  }

  async playNext(connection: VoiceConnection, guildId: string): Promise<void> {
    try {
      // Find the queue for the guild
      const queue = await musicQueueModel.findOne({ guildId });

      // Check if the queue is empty
      if (!queue || queue.queue.length === 0) {
        // Leave the voice channel
        await connection.disconnect();
        return;
      }

      // Get the next song from the queue
      const currentSong = queue.queue[0];

      // Play the song
      const stream = ytdl(currentSong.url, { filter: 'audioonly' });

      const dispatcher = connection.play(stream);

      // Update the queue
      queue.queue.shift();
      await queue.save();

      // Handle song end event
      dispatcher.on('finish', () => {
        this.playNext(connection, guildId);
      });
    } catch (error) {
      logger.error('Error playing next song:', error);
    }
  }

  async skip(guildId: string): Promise<void> {
    try {
      // Find the queue for the guild
      const queue = await musicQueueModel.findOne({ guildId });

      if (!queue) {
        return;
      }

      // Skip the current song
      queue.queue.shift();
      await queue.save();

      // Get the voice connection for the guild
      const connection = this.client.voice.adapters.get(guildId).connection;

      // If the connection is active, play the next song
      if (connection) {
        this.playNext(connection, guildId);
      }
    } catch (error) {
      logger.error('Error skipping song:', error);
    }
  }

  async stop(guildId: string): Promise<void> {
    try {
      // Find the queue for the guild
      const queue = await musicQueueModel.findOne({ guildId });

      if (!queue) {
        return;
      }

      // Clear the queue
      queue.queue = [];
      await queue.save();

      // Get the voice connection for the guild
      const connection = this.client.voice.adapters.get(guildId).connection;

      // If the connection is active, stop the current song and disconnect
      if (connection) {
        connection.dispatcher.end();
        await connection.disconnect();
      }
    } catch (error) {
      logger.error('Error stopping music playback:', error);
    }
  }

  async getQueue(guildId: string): Promise<any[]> {
    try {
      // Find the queue for the guild
      const queue = await musicQueueModel.findOne({ guildId });

      if (queue) {
        // Return the queue
        return queue.queue;
      }

      // Return an empty queue if no queue is found
      return [];
    } catch (error) {
      logger.error('Error getting music queue:', error);
      return [];
    }
  }

  async setLoopMode(guildId: string, mode: string): Promise<void> {
    try {
      // Validate input
      if (!['song', 'queue', 'off'].includes(mode)) {
        throw new Error('Invalid loop mode.');
      }

      // Find the queue for the guild
      const queue = await musicQueueModel.findOne({ guildId });

      if (queue) {
        // Update the loop mode
        queue.loopMode = mode;
        await queue.save();
      }
    } catch (error) {
      logger.error('Error setting loop mode:', error);
    }
  }

  async getNowPlaying(guildId: string): Promise<any> {
    try {
      // Find the queue for the guild
      const queue = await musicQueueModel.findOne({ guildId });

      if (queue && queue.queue.length > 0) {
        // Return the currently playing song
        return queue.queue[0];
      }

      // Return null if no song is currently playing
      return null;
    } catch (error) {
      logger.error('Error getting now playing song:', error);
      return null;
    }
  }
}