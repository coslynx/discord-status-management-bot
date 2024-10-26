import { SlashCommandBuilder } from 'discord.js';
import { triviaService } from '../../services/minigameService';

export default {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Play a trivia game.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('start')
        .setDescription('Starts a new trivia game.')
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      if (subcommand === 'start') {
        await triviaService.startGame(interaction);
      }
    } catch (error) {
      console.error('Error starting trivia game:', error);
      await interaction.reply({
        content: 'An error occurred while starting the trivia game. Please try again later.',
        ephemeral: true,
      });
    }
  },
};