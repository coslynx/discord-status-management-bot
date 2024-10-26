import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a list of available commands.'),
  async execute(interaction) {
    await interaction.reply({
      content: 'Here are the available commands:\n\n'
        + 'Status Management:\n'
        + '/set status <title> -image <image url> -badge <badge name> - Set a custom status.\n'
        + '/update status <title> -image <image url> -badge <badge name> - Update your existing status.\n'
        + '/remove status - Remove your current status.\n'
        + '/show status - Show your current status.\n\n'
        + 'Mini-Games:\n'
        + '/trivia start - Play a trivia game.\n'
        + '/wordle - Play a Wordle-like word guessing game.\n'
        + '/hangman - Play a classic hangman game.\n\n'
        + 'Server Management:\n'
        + '/server settings <setting> <value> - Set server settings.\n'
        + '/server roles <action> <role name> <member id> - Manage server roles.\n'
        + '/server channels <action> <channel name> <channel type> - Manage server channels.\n\n'
        + 'Moderation:\n'
        + '/mute <member id> <reason> - Mute a member.\n'
        + '/unmute <member id> - Unmute a member.\n'
        + '/kick <member id> <reason> - Kick a member.\n'
        + '/ban <member id> <reason> - Ban a member.\n'
        + '/warn <member id> <reason> - Warn a member.\n\n'
        + 'Information:\n'
        + '/serverinfo - Show server information.\n'
        + '/userinfo <member id> - Show user information.\n'
        + '/stats - Show bot stats.\n\n'
        + 'Profile Customization:\n'
        + '/settheme <theme> - Set your profile theme.\n'
        + '/setbackground <image url> - Set your profile background.\n'
        + '/setprofilepic <image url> - Set your profile picture.\n\n'
        + 'Polls & Surveys:\n'
        + '/poll create <question> <options> - Create a new poll.\n'
        + '/vote <poll id> <option> - Vote in a poll.\n'
        + '/poll results <poll id> - Show poll results.\n\n'
        + 'Music:\n'
        + '/music play <song name> - Play a song.\n'
        + '/music skip - Skip the current song.\n'
        + '/music stop - Stop music playback.\n'
        + '/music queue - Show the music queue.\n'
        + '/music loop - Loop the current song or queue.\n'
        + '/music nowplaying - Show the currently playing song.\n\n'
        + 'Roles:\n'
        + '/role create <role name> <permissions> - Create a new role.\n'
        + '/role assign <member id> <role name> - Assign a role to a member.\n'
        + '/role remove <member id> <role name> - Remove a role from a member.\n\n'
        + 'Automation:\n'
        + '/schedule <time> <task> - Schedule a task.\n'
        + '/remind <time> <message> - Set a reminder.\n\n'
        + 'Use `/help <command name>` for detailed instructions on a specific command.',
      ephemeral: true,
    });
  },
};