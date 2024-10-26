import { SlashCommandBuilder } from 'discord.js';
import serverService from '../../services/serverService';

export default {
  data: new SlashCommandBuilder()
    .setName('server channels')
    .setDescription('Manage server channels.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('create')
        .setDescription('Create a new channel.')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The name of the new channel.')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('type')
            .setDescription('The type of the new channel (text or voice).')
            .setRequired(true)
            .addChoices({ name: 'Text Channel', value: 'text' }, { name: 'Voice Channel', value: 'voice' })
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('delete')
        .setDescription('Delete an existing channel.')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('The channel to delete.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('update')
        .setDescription('Update an existing channel.')
        .addChannelOption((option) =>
          option
            .setName('channel')
            .setDescription('The channel to update.')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The new name for the channel.')
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName('topic')
            .setDescription('The new topic for the channel.')
            .setRequired(false)
        )
    ),
  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const guild = interaction.guild;

      if (subcommand === 'create') {
        const name = interaction.options.getString('name');
        const type = interaction.options.getString('type');

        const channel = await serverService.createChannel(guild, name, type);
        await interaction.reply({ content: `Channel ${name} created successfully.`, ephemeral: true });
      } else if (subcommand === 'delete') {
        const channel = interaction.options.getChannel('channel');

        await serverService.deleteChannel(channel);
        await interaction.reply({ content: `Channel ${channel.name} deleted successfully.`, ephemeral: true });
      } else if (subcommand === 'update') {
        const channel = interaction.options.getChannel('channel');
        const newName = interaction.options.getString('name');
        const newTopic = interaction.options.getString('topic');

        await serverService.updateChannel(channel, newName, newTopic);
        await interaction.reply({
          content: `Channel ${channel.name} updated successfully.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error('Error managing server channels:', error);
      await interaction.reply({
        content: 'An error occurred while managing server channels. Please try again later.',
        ephemeral: true,
      });
    }
  },
};