import { SlashCommandBuilder } from 'discord.js';
import { hangmanService } from '../../services/minigameService';

export default {
  data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play a classic hangman game.'),
  async execute(interaction) {
    try {
      await hangmanService.startGame(interaction);
    } catch (error) {
      console.error('Error starting hangman game:', error);
      await interaction.reply({
        content: 'An error occurred while starting the hangman game. Please try again later.',
        ephemeral: true,
      });
    }
  },
};