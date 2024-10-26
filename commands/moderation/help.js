import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('moderation help')
    .setDescription('Shows a list of available moderation commands.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available moderation commands:\n\n'
        + '/mute <member id> <reason> - Mute a member.\n'
        + '/unmute <member id> - Unmute a member.\n'
        + '/kick <member id> <reason> - Kick a member.\n'
        + '/ban <member id> <reason> - Ban a member.\n'
        + '/warn <member id> <reason> - Warn a member.',
      ephemeral: true,
    });
  },
};