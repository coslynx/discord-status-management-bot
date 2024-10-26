import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('minigames help')
    .setDescription('Shows a list of available mini-games.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available mini-games:\n\n'
        + '/trivia start - Play a trivia game.\n'
        + '/wordle - Play a Wordle-like word guessing game.\n'
        + '/hangman - Play a classic hangman game.',
      ephemeral: true,
    });
  },
};