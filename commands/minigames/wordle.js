import { SlashCommandBuilder } from 'discord.js';
import { wordleService } from '../../services/minigameService';

export default {
  data: new SlashCommandBuilder()
    .setName('wordle')
    .setDescription('Play a Wordle-like word guessing game.'),
  async execute(interaction) {
    try {
      await wordleService.startGame(interaction);
    } catch (error) {
      console.error('Error starting Wordle game:', error);
      await interaction.reply({
        content: 'An error occurred while starting the Wordle game. Please try again later.',
        ephemeral: true,
      });
    }
  },
};