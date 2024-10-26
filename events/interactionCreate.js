import { Interaction } from 'discord.js';
import statusService from '../../services/statusService';

export default async (interaction: Interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      // Handle all command interactions here
      const commandName = interaction.commandName;
      const command = interaction.client.commands.get(commandName);

      if (!command) {
        return interaction.reply({ content: 'Invalid command.', ephemeral: true });
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing command ${commandName}:`, error);
        await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.', ephemeral: true });
      }
    } else if (interaction.isAutocomplete()) {
      // Handle autocomplete interactions here
    } else if (interaction.isButton()) {
      // Handle button interactions here
    } else if (interaction.isSelectMenu()) {
      // Handle select menu interactions here
    } else if (interaction.isModalSubmit()) {
      // Handle modal submit interactions here
    }
  } catch (error) {
    console.error('Error handling interactionCreate event:', error);
  }
};