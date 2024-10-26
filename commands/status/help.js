import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('status help')
    .setDescription('Shows a list of available commands for managing your status.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available commands for managing your status:\n\n'
        + '/set status <title> -image <image url> -badge <badge name> - Set a custom status.\n'
        + '/update status <title> -image <image url> -badge <badge name> - Update your existing status.\n'
        + '/remove status - Remove your current status.\n'
        + '/show status - Show your current status.',
      ephemeral: true,
    });
  },
};